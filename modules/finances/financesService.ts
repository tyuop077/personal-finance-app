import { RealmClient } from "@/realm/realmClient";
import Finances, { FinancesTable } from "@/modules/finances/finances";


export default class FinancesService {
  getFinances = () => {
    return RealmClient.objects(FinancesTable) as unknown as Finances[];
  };

  createFinance = (data: object) => {
    RealmClient.write(() => {
      RealmClient.create(FinancesTable, data);
    });
  };

  updateFinances = (finance: Finances, values: object) => {
    RealmClient.write(() => {
      Object.assign(finance, values);
    });
  };

  deleteFinance = (finance: Finances) => {
    RealmClient.write(() => {
      RealmClient.delete(finance);
    });
  };
}
