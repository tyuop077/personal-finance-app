import { makeAutoObservable } from "mobx";
import Finances from "@/modules/finances/finances";
import FinancesService from "@/modules/finances/financesService";

export class FinancesStore {
  loading = false;
  finances: Finances[] = [];

  private service: FinancesService;

  constructor() {
    makeAutoObservable(this);
    this.service = new FinancesService();
  }

  getFinances = () => {
    this.setLoading(true);

    this.setFinances(this.service.getFinances());

    this.setLoading(false);
  };

  createFinance = () => {
    this.setLoading(true);

    this.service.createFinance({
      _id: 1,
      type: "Test",
      category: "testeda",
      comment: "test comm",
      isExpense: true,
      value: 4000,
    });

    this.setLoading(false);
  };

  updateFinance = (finances: Finances, values: object) => {
    this.setLoading(true);

    this.service.updateFinances(finances, values);

    this.setLoading(false);
  };

  deleteFinance = (finances: Finances) => {
    this.setLoading(true);

    this.service.deleteFinance(finances);

    this.setLoading(false);
  };

  // SETTERS

  private setLoading = (value: boolean) => {
    this.loading = value;
  };

  private setFinances = (value: Finances[]) => {
    this.finances = value;
  };
}
