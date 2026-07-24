// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import ApiGateway from '../gateways/Api.gateway';

export interface AiRequestPayload {
  question: string;
}

export type AiResponse = { text: string } | string;

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  error?: boolean;
}

interface AiAssistantContextValue {
  messages: ChatMessage[];
  aiLoading: boolean;
  sendAiRequest: (question: string) => void;
  resetConversation: () => void;
}

const Context = createContext<AiAssistantContextValue>({
  messages: [],
  aiLoading: false,
  sendAiRequest: () => {},
  resetConversation: () => {},
});

export const useAiAssistant = () => useContext(Context);

interface ProductAIAssistantProviderProps {
  children: React.ReactNode;
  productId: string;
}

const ProductAIAssistantProvider = ({ children, productId }: ProductAIAssistantProviderProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation<AiResponse, Error, AiRequestPayload>({
    mutationFn: ({ question }) => ApiGateway.askProductAIAssistant(productId, question),
  });

  // Clear conversation when switching products.
  useEffect(() => {
    mutation.reset();
    setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const sendAiRequest = useCallback(
    (question: string) => {
      setMessages((prev) => [...prev, { id: uuidv4(), role: 'user', text: question }]);
      mutation.mutate(
        { question },
        {
          onSuccess: (data) => {
            const text = typeof data === 'string' ? data : data.text;
            setMessages((prev) => [...prev, { id: uuidv4(), role: 'assistant', text }]);
          },
          onError: (err) => {
            setMessages((prev) => [
              ...prev,
              { id: uuidv4(), role: 'assistant', text: err.message ?? 'Sorry, something went wrong.', error: true },
            ]);
          },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutation.mutate]
  );

  const resetConversation = useCallback(() => {
    mutation.reset();
    setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      messages,
      aiLoading: mutation.isPending,
      sendAiRequest,
      resetConversation,
    }),
    [messages, mutation.isPending, sendAiRequest, resetConversation]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ProductAIAssistantProvider;
