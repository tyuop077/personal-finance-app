import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, List, Menu, Switch, Text } from "react-native-paper";
import { router } from "expo-router";
import TestBanner from "@/components/TestBanner";
import { useState } from "react";

export default function SettingsPage() {
  const handleOpenThemePage = () => {
    router.push("/settings/theme");
  };

  return (
    <>
      <Appbar.Header mode="large">
        <Appbar.BackAction onPress={router.back} />
        <Appbar.Content title="Настройки" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <List.Section>
          <List.Subheader>Внешний вид</List.Subheader>
          <List.Item title="Тема" onPress={handleOpenThemePage} left={() => <List.Icon icon="palette" />} />
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
