import { FinanceStore } from "./modules/finance/finance.store";
import { createContext } from "react";

class RootStore {
  finances;

  constructor() {
    this.finances = new FinanceStore();
  }
}

export const rootStore = new RootStore();

export const storesContext = createContext(rootStore);
