import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Статистика</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
