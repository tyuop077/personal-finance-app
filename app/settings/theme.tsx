import { ScrollView, StyleSheet } from "react-native";
import { Appbar, List } from "react-native-paper";
import { router } from "expo-router";
import { useContext } from "react";
import { PreferencesContext, ThemeState } from "@/modules/theme/theme.context";

export default function SettingsPage() {
  const { toggleTheme, themeState } = useContext(PreferencesContext);

  return (
    <ScrollView style={styles.container}>
      <List.Item
        title="Автоматически"
        onPress={() => toggleTheme(ThemeState.AUTOMATIC)}
        left={() => <List.Icon icon="palette" />}
      />
      <List.Item
        title="Светлая"
        onPress={() => toggleTheme(ThemeState.LIGHT)}
        left={() => <List.Icon icon="palette" />}
      />
      <List.Item
        title="Тёмная"
        onPress={() => toggleTheme(ThemeState.DARK)}
        left={() => <List.Icon icon="palette" />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
  },
});
