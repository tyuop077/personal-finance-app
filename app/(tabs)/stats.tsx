import { StyleSheet, View } from "react-native";
import { Appbar, Button, Menu, Text } from "react-native-paper";
import { router } from "expo-router";
import TestBanner from "@/components/TestBanner";
import { useState } from "react";

export default function StatsPage() {
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

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Статистика" />
        <Menu
          visible={visible}
          onDismiss={handleCloseMenu}
          anchor={<Appbar.Action icon="feather/more-vertical" onPress={handleOpenMenu} />}
        >
          <Menu.Item title="Настройки" onPress={handleSettings} />
        </Menu>
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.title}>Статистика</Text>
        <Button mode="contained-tonal" icon="history" onPress={handleTestButton}>
          test modal
        </Button>
        <TestBanner />
      </View>
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
