import React from 'react';
import { storesContext } from "@/store/store";

export const useRootStore = () => React.useContext(storesContext);
