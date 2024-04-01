import React from "react";
import { FinanceItem, FinanceType } from "@/modules/finance/finance.model";
import Stats from "@/components/Stats";

export default function Expenses() {
  return (
    <Stats
      tempData={
        new Map<string | undefined, FinanceItem[]>([
          [
            "Игры",
            [
              {
                id: 1,
                title: "Игры",
                type: FinanceType.EXPENSE,
                category: "Игры",
                comment: "comment",
                value: 1200,
                date: new Date(Date.now()),
              },
              {
                id: 2,
                title: "Игры",
                type: FinanceType.EXPENSE,
                category: "Игры",
                comment: "comment",
                value: 1200,
                date: new Date(Date.now()),
              },
            ],
          ],
          [
            "Супермаркеты",
            [
              {
                id: 3,
                title: "Супермаркеты",
                type: FinanceType.EXPENSE,
                category: "Супермаркеты",
                comment: "comment",
                value: 1200,
                date: new Date(Date.now()),
              },
              {
                id: 4,
                title: "Супермаркеты",
                type: FinanceType.EXPENSE,
                category: "Супермаркеты",
                comment: "comment",
                value: 6000,
                date: new Date(Date.now()),
              },
            ],
          ],
          [
            "Здоровье",
            [
              {
                id: 5,
                title: "Спортзал",
                type: FinanceType.EXPENSE,
                category: "Здоровье",
                comment: "comment",
                value: 5000,
                date: new Date(Date.now()),
              },
              {
                id: 6,
                title: "Бассейн",
                type: FinanceType.EXPENSE,
                category: "Здоровье",
                comment: "comment",
                value: 100,
                date: new Date(Date.now()),
              },
            ],
          ],
          [
            "Столовые",
            [
              {
                id: 7,
                title: "Столовые",
                type: FinanceType.EXPENSE,
                category: "Столовые",
                comment: "comment",
                value: 10000,
                date: new Date(Date.now()),
              },
              {
                id: 8,
                title: "Столовые",
                type: FinanceType.EXPENSE,
                category: "Столовые",
                comment: "comment",
                value: 100,
                date: new Date(Date.now()),
              },
            ],
          ],
        ])
      }
      isExpense={true}
    />
  );
}
