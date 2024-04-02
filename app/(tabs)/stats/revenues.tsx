import React from "react";
import { FinanceType } from "@/modules/finance/finance.model";

import Stats from "@/components/Stats";

export default function Revenues() {
  return (
    <Stats financeType={FinanceType.INCOME} />
  );
}
