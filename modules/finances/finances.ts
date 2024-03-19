import Realm from "realm";
import BSON = Realm.BSON;

enum FinanceType {
  INCOME = "Доход",
  EXPENSE = "Расход",
}

const FinancesTable = "Finances";

export default class Finances extends Realm.Object<Finances> {
  private _id!: BSON.ObjectId;
  type!: FinanceType;
  category?: string;
  comment?: string;
  isExpense!: boolean;
  value!: number;

  static schema: Realm.ObjectSchema = {
    name: FinancesTable,
    properties: {
      _id: "objectId",
      type: "string",
      category: "string?",
      comment: "string?",
      isExpense: "boolean",
      value: "number",
    },
    primaryKey: "_id",
  };
}
