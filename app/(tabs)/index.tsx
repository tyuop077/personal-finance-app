import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { AnimatedFAB } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleAdd = () => {
    router.push("/modal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        {[...new Array(100).keys()].map((_, i) => (
          <Text key={i}>{i}</Text>
        ))}
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        label="Добавить"
        extended={isExtended}
        onPress={handleAdd}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fabStyle]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
