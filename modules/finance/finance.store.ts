import { makeAutoObservable, runInAction } from "mobx";
import FinanceService from "./finance.service";
import { FinanceModel, FinanceItem, FinanceType } from "./finance.model";
import LocalRepository from "../../utils/localRepository";
import defaultFinance from "@/mock/defaultFinance";

export class FinanceStore {
  financeService;
  financeModel: FinanceModel = new FinanceModel();
  isLoading: boolean = false;
  financeRepository = new LocalRepository<FinanceItem[]>("finance");

  constructor() {
    makeAutoObservable(this);
    this.financeService = new FinanceService();
    this.getFinances();
  }

  async getFinances() {
    this.setIsLoading(true);
    try {
      const storedFinances = await this.financeRepository.getItems();
      if (storedFinances) {
        runInAction(() => {
          this.financeModel.items = storedFinances;
        });
      } else {
        runInAction(() => {
          this.financeModel.items = defaultFinance;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async editFinanceItem(itemIndex: number, editedItem: FinanceItem) {
    this.setIsLoading(true);
    await runInAction(async () => {
      this.financeModel = this.financeService.editFinanceItem(this.financeModel, itemIndex, editedItem);
      await this.financeRepository.setItems(this.financeModel.items);
    });
    this.setIsLoading(false);
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  async addFinanceItem(newItem: FinanceItem) {
    this.setIsLoading(true);
    await runInAction(async () => {
      this.financeModel = this.financeService.addFinanceItem(this.financeModel, newItem);
      await this.financeRepository.setItems(this.financeModel.items);
    });
    this.setIsLoading(false);
  }

  async deleteFinanceItem(itemId: number) {
    this.setIsLoading(true);
    await runInAction(async () => {
      this.financeModel = this.financeService.deleteFinanceItem(this.financeModel, itemId);
      await this.financeRepository.setItems(this.financeModel.items);
    });
    this.setIsLoading(false);
  }

  getFinanceItemsByDateRange(type: FinanceType, startDate: Date, endDate: Date) {
    return this.financeService.getFinanceItemsByDateRange(this.financeModel, type, startDate, endDate);
  }
}
