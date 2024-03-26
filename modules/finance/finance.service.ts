import { FinanceModel, FinanceItem } from "./finance.model";

export default class FinanceService {
  addFinanceItem = (model: FinanceModel, newItem: FinanceItem) => {
    model.items.push(newItem);
    return model;
  };

  deleteFinanceItem = (model: FinanceModel, itemId: number) => {
    model.items = model.items.filter(item => item.id !== itemId);
    return model;
  };
}
