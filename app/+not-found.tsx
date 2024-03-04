import { StyleSheet, Text, View } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Button, Title } from "react-native-paper";
import * as React from "react";

export default function NotFoundScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Ничего не найдено</Title>
      <Text style={styles.text}>Данной страницы не существует</Text>
      <View style={styles.buttons}>
        {navigation.canGoBack() ? (
          <Button mode="elevated" icon="arrow-left" onPress={() => router.back()}>
            Назад
          </Button>
        ) : (
          <Button mode="elevated" icon="home" onPress={() => router.replace("/")}>
            На главную
          </Button>
        )}
      </View>
    </View>
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
    fontFamily: "Inter_900Black",
    fontSize: 30,
  },
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
