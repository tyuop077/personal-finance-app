export enum FinanceType {
  INCOME = "Доход",
  EXPENSE = "Расход",
}

export interface FinanceItem {
  id: number;
  type: FinanceType;
  value: number;
  comment?: string;
  category?: string;
  isExpense: boolean;
}

export class FinanceModel {
  items: FinanceItem[] = [];
}
