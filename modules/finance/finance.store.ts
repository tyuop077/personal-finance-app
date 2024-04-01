import { makeAutoObservable, runInAction } from "mobx";
import FinanceService from "./finance.service";
import { FinanceModel, FinanceItem, FinanceType } from "./finance.model";
import LocalRepository from "../../utils/localRepository";

export class FinanceStore {
  financeService;
  financeModel: FinanceModel = new FinanceModel();
  isLoading: boolean = false;
  financeRepository = new LocalRepository<FinanceItem[]>("finance");

  constructor() {
    makeAutoObservable(this);
    this.financeService = new FinanceService();
    this.loadFinances();
  }

  async loadFinances() {
    this.isLoading = true;
    const storedFinances = await this.financeRepository.getItems();
    if (storedFinances) {
      runInAction(() => {
        this.financeModel.items = storedFinances;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  async getFinances() {
    this.setIsLoading(true);
    try {
      const storedFinances = await this.financeRepository.getItems();
      if (storedFinances) {
        runInAction(() => {
          this.financeModel.items = storedFinances;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  async addFinanceItem(newItem: FinanceItem) {
    this.financeModel = this.financeService.addFinanceItem(this.financeModel, newItem);
    await this.financeRepository.setItems(this.financeModel.items);
  }

  async deleteFinanceItem(itemId: number) {
    this.financeModel = this.financeService.deleteFinanceItem(this.financeModel, itemId);
    await this.financeRepository.setItems(this.financeModel.items);
  }

  getFinanceItemsByDateRange(type: FinanceType, startDate: Date, endDate: Date) {
    return this.financeService.getFinanceItemsByDateRange(this.financeModel, type, startDate, endDate);
  }
}
