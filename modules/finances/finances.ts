import Realm, {ObjectSchema} from 'realm';
import BSON = Realm.BSON;

export const FinancesTable = 'Finances';


export default class Finances extends Realm.Object<Finances> {
  private _id!: BSON.ObjectId;
  public type: string;
  public category: string;
  public comment: string;
  public isExpense: boolean;
  public value: number;

  static schema: ObjectSchema = {
    name: FinancesTable,
    properties: {
      _id: 'objectId',
      type: 'string',
      category: 'string',
      comment: 'string',
      isExpense: 'boolean',
      value: "number",
    },
    primaryKey: '_id',
  };
}
