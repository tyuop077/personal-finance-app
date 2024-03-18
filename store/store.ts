import React from 'react';
import { FinancesStore } from "@/modules/finances/financesStore";

class RootStore {
  finances: FinancesStore

  constructor() {
    this.finances = new FinancesStore();
  }
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);