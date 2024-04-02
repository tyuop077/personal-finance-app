import { FinanceItem, FinanceModel, FinanceType } from "./finance.model";

export default class FinanceService {
  addFinanceItem = (model: FinanceModel, newItem: FinanceItem) => {
    model.items.push(newItem);
    return model;
  };

  deleteFinanceItem = (model: FinanceModel, itemIndex: number) => {
    model.items.splice(itemIndex, 1);
    return model;
  };

  editFinanceItem(model: FinanceModel, itemIndex: number, editedItem: FinanceItem) {
    model.items[itemIndex] = editedItem;
    return model;
  }

  getFinanceItemsByDateRange = (model: FinanceModel, type: FinanceType, startDate: Date, endDate: Date): Map<string | undefined, FinanceItem[]> => {
    let filteredItems = model.items.filter(item =>
      (item.type == type && new Date(item.date) >= startDate && new Date(item.date) <= endDate));

    let result = new Map<string | undefined, FinanceItem[]>();
    filteredItems.forEach(value => {
      if (result.get(value.category) == undefined) {
        result.set(value.category, []);
      }
      result.get(value.category)!.push(value);
    });
    return result;
  };
}
