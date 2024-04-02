import React from "react";
import { FinanceType } from "@/modules/finance/finance.model";
import Stats from "@/components/Stats";

export default function Expenses() {
  return <Stats financeType={FinanceType.EXPENSE} />;
}
