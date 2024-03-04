import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { router } from "expo-router";
import TestBanner from "@/components/TestBanner";

export default function TabTwoScreen() {
  const handleTestButton = () => {
    router.push("/modal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Статистика</Text>
      <Button mode="contained-tonal" icon="history" onPress={handleTestButton}>
        test modal
      </Button>
      <TestBanner />
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
