import { StyleSheet, View } from "react-native";
import { Appbar, Button, Menu, Text } from "react-native-paper";
import { router } from "expo-router";
import TestBanner from "@/components/TestBanner";
import { useState } from "react";
import { useRootStore } from "@/hooks/useRootStore";
import { Tabs, TabScreen, TabsProvider } from "react-native-paper-tabs";
import Revenues from "@/app/(tabs)/stats/revenues";
import Expenses from "@/app/(tabs)/stats/expenses";

export default function StatsPage() {
  const { finances } = useRootStore();
  const [visible, setVisible] = useState(false);

  const handleOpenMenu = () => setVisible(true);

  const handleCloseMenu = () => setVisible(false);

  const handleTestButton = () => {
    router.push("/modal");
  };

  const handleSettings = () => {
    router.push("/settings");
    setVisible(false);
  };

  const handleReset = () => {
    finances.financeRepository.removeAll();
    finances.financeModel.items = [];
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Статистика" />
        <Menu
          visible={visible}
          onDismiss={handleCloseMenu}
          anchor={<Appbar.Action icon="feather/more-vertical" onPress={handleOpenMenu} />}
        >
          <Menu.Item title="Сбросить состояние" onPress={handleReset} />
          <Menu.Item title="Настройки" onPress={handleSettings} />
        </Menu>
      </Appbar.Header>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Расходы">
            <Expenses/>
          </TabScreen>
          <TabScreen label="Доходы">
            <Revenues/>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
