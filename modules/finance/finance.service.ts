import { FinanceItem, FinanceModel, FinanceType } from "./finance.model";

export default class FinanceService {
  addFinanceItem = (model: FinanceModel, newItem: FinanceItem) => {
    model.items.push(newItem);
    return model;
  };

  deleteFinanceItem = (model: FinanceModel, itemId: number) => {
    model.items = model.items.filter(item => item.id !== itemId);
    return model;
  };

  editFinanceItem(model: FinanceModel, editedItem: FinanceItem) {
    const itemIndex = model.items.findIndex(item => item.id === editedItem.id);
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
