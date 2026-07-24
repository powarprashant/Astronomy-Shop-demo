// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Money } from '../protos/demo';

export const moneyToNumber = (money?: Money): number => (money ? money.units + money.nanos / 1_000_000_000 : 0);
