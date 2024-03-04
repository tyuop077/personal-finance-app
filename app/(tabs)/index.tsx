import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { AnimatedFAB } from "react-native-paper";

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView onScroll={onScroll}>
        {[...new Array(100).keys()].map((_, i) => (
          <Text>{i}</Text>
        ))}
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        label="Добавить"
        extended={isExtended}
        onPress={() => undefined}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fabStyle]}
      />
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
