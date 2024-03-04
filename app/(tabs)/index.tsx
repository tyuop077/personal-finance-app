import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { AnimatedFAB } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddModal from "@/components/AddModal";
import { Modalize } from "react-native-modalize";

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);
  const modalizeRef = useRef<Modalize>();

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleAdd = () => {
    modalizeRef.current?.open();
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
      <AddModal modalizeRef={modalizeRef} />
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
