import React from "react";
import { FinanceItem, FinanceType } from "@/modules/finance/finance.model";

import Stats from "@/components/Stats";

export default function Revenues() {
  return (
    <Stats
      tempData={
        new Map<string | undefined, FinanceItem[]>([
          [
            "Зарплата",
            [
              {
                id: 1,
                // @ts-ignore
                title: "Зарплата",
                type: FinanceType.INCOME,
                category: "Зарплата",
                comment: "comment",
                value: 1200,
                date: new Date(Date.now()),
              },
              {
                id: 2,
                title: "Зарплата",
                type: FinanceType.INCOME,
                category: "Зарплата",
                comment: "comment",
                value: 1200,
                date: new Date(Date.now()),
              },
              {
                id: 3,
                title: "Зарплата",
                type: FinanceType.INCOME,
                category: "Зарплата",
                comment: "Зарплата",
                value: 20000,
                date: new Date(Date.now()),
              },
            ],
          ],
        ])
      }
      isExpense={false}
    />
  );
}
