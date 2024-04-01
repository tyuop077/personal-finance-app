import { ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { Appbar, Button, List, Menu, Switch, Text, ThemeProvider, useTheme } from "react-native-paper";
import { router } from "expo-router";
import TestBanner from "@/components/TestBanner";
import { useContext, useEffect, useState } from "react";
import { RootLayoutNav, retrieveData } from "../app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export const _storeData = async (item: string) => {
  try {
    await AsyncStorage.setItem(
      'theme',
      item,
    );
    // return
  } catch (error) {
  }
};

export default function SettingsPage() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const changeTheme = async () => {
    const actualTheme = await retrieveData();
    var newTheme: string
    (actualTheme == "light") ? newTheme="dark" : newTheme="light"
    _storeData(newTheme)
    console.log("newTheme:"+actualTheme);
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
  return (
    <>
      <Appbar.Header mode="large">
        <Appbar.BackAction onPress={router.back} />
        <Appbar.Content title="Статистика" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <List.Section>
          <List.Subheader>Внешний вид</List.Subheader>
          <List.Item title="Тема" onPress={changeTheme} left={() => <List.Icon icon="palette" />} />
        </List.Section>
        <List.Section>
          <List.Subheader>Общее</List.Subheader>
          <List.Item
            title="test"
            onPress={onToggleSwitch}
            left={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
          />
        </List.Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
  },
});
