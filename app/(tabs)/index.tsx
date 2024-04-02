import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, TextInput, AnimatedFAB, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddModal from "@/components/AddModal";
import { Modalize } from "react-native-modalize";
import { useRootStore } from "@/hooks/useRootStore";
import { FinanceItem, FinanceType } from "@/modules/finance/finance.model";
import defaultFinance from "@/mock/defaultFinance";
import { FinanceCard } from "@/components/FinanceCard";

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);
  const modalizeRef = useRef<Modalize>();
  const { finances } = useRootStore();
  const theme = useTheme();

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    finances.getFinances();
  }, []);

  const handleAdd = () => {
    modalizeRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        <FinanceCard />
        <View style={styles.elemsContainer}>
          {finances.financeModel.items.map(elem => (
            <View key={elem.id} style={styles.elemsEachContainer}>
              <View style={styles.elemsEachContainerLeft}>
                <Text style={styles.transactionTitle}>{elem.title}</Text>
                <Text style={styles.transactionCategory}>{elem.category}</Text>
              </View>
              <View style={styles.elemsEachContainerRight}>
                <Text style={[styles.transactionValue, elem.type === FinanceType.EXPENSE ? null : { color: "green" }]}>
                  {elem.type == FinanceType.EXPENSE ? `-${elem.value}` : `+${elem.value}`}
                </Text>
                <Text
                  style={[styles.transactionCurrency, elem.type === FinanceType.EXPENSE ? null : { color: "green" }]}
                >
                  ₽
                </Text>
              </View>
            </View>
          ))}
        </View>
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
      <AddModal modalizeRef={modalizeRef}></AddModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  elemsContainer: {
    display: "flex",
    paddingBottom: 50,
  },
  elemsEachContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  elemsEachContainerLeft: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
  },
  transactionTitle: {
    fontSize: 16,
  },
  transactionCategory: {
    fontSize: 13,
  },
  elemsEachContainerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  transactionValue: {
    fontSize: 16,
  },
  transactionCurrency: {
    marginLeft: 3,
    fontSize: 16,
  },
});
