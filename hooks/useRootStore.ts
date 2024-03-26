import { useContext } from "react";
import { storesContext } from "@/RootStore";

export const useRootStore = () => useContext(storesContext);
