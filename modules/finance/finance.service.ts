import { FinanceItem, FinanceModel } from "./finance.model";

export default class FinanceService {
  addFinanceItem = (model: FinanceModel, newItem: FinanceItem) => {
    model.items.push(newItem);
    return model;
  };

  deleteFinanceItem = (model: FinanceModel, itemId: number) => {
    model.items = model.items.filter(item => item.id !== itemId);
    return model;
  };

  getFinanceItemsByDateRange = (model: FinanceModel, isExpense: boolean, startDate: Date, endDate: Date) : Map<string | undefined, FinanceItem[]> => {
    let filteredItems = model.items.filter(item =>
      (item.isExpense == isExpense && item.date >= startDate && item.date <= endDate));



    let result = new Map<string | undefined, FinanceItem[]>();
    filteredItems.forEach(value => {
      if(result.get(value.category) == undefined)
      {
        result.set(value.category, []);
      }
      result.get(value.category)!.push(value)
    });
    return result;
  }
}
