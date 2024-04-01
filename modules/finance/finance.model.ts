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
  date: Date;
}

export class FinanceModel {
  items: FinanceItem[] = [];
}
