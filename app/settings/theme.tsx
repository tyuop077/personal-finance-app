import { ScrollView, StyleSheet } from "react-native";
import { List, useTheme } from "react-native-paper";
import { useContext } from "react";
import { PreferencesContext, ThemeState } from "@/modules/theme/theme.context";

export default function SettingsPage() {
  const { toggleTheme, themeState } = useContext(PreferencesContext);
  const theme = useTheme();

  const buttonStyle = (state: ThemeState) => (themeState === state ? { color: theme.colors.primary } : {});

  return (
    <ScrollView style={styles.container}>
      <List.Item
        title="Как на устройстве"
        onPress={() => toggleTheme(ThemeState.AUTOMATIC)}
        left={() => <List.Icon icon="palette" />}
        titleStyle={buttonStyle(ThemeState.AUTOMATIC)}
      />
      <List.Item
        title="Светлая"
        onPress={() => toggleTheme(ThemeState.LIGHT)}
        left={() => <List.Icon icon="palette" />}
        titleStyle={buttonStyle(ThemeState.LIGHT)}
      />
      <List.Item
        title="Тёмная"
        onPress={() => toggleTheme(ThemeState.DARK)}
        left={() => <List.Icon icon="palette" />}
        titleStyle={buttonStyle(ThemeState.DARK)}
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
