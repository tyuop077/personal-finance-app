import { createContext } from "react";

export enum ThemeState {
  AUTOMATIC = "AUTOMATIC",
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export const PreferencesContext = createContext({
  toggleTheme: (state: ThemeState) => {},
  themeState: ThemeState.AUTOMATIC,
});
