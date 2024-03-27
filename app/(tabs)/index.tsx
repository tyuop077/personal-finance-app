import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AnimatedFAB, Button, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddModal from "@/components/AddModal";
import { Modalize } from "react-native-modalize";
import { useRootStore } from "@/hooks/useRootStore";

enum FinanceType {
  INCOME = "Доход",
  EXPENSE = "Расход",
}

interface FinanceItem {
  id: number;
  type: FinanceType;
  value: number;
  comment?: string;
  category?: string;
  isExpense: boolean;
}

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);
  const modalizeRef = useRef<Modalize>();
  const { finances } = useRootStore();
  const [items, setItems] = useState<FinanceItem[]>([
    { id: 1, type: FinanceType.EXPENSE, category: "еда", comment: "comment", isExpense: true, value: 1200 },
    { id: 2, type: FinanceType.EXPENSE, category: "еда", comment: "comment", isExpense: true, value: 1200 },
    { id: 3, type: FinanceType.EXPENSE, category: "еда", comment: "comment", isExpense: true, value: 1200 },
    { id: 4, type: FinanceType.EXPENSE, category: "еда", comment: "comment", isExpense: true, value: 1200 },
    { id: 5, type: FinanceType.EXPENSE, category: "еда", comment: "comment", isExpense: true, value: 1200 },
    { id: 6, type: FinanceType.INCOME, isExpense: false, value: 1000 },
    { id: 7, type: FinanceType.INCOME, isExpense: false, value: 20000 },
    { id: 8, type: FinanceType.INCOME, isExpense: false, value: 60000 },
    { id: 9, type: FinanceType.INCOME, isExpense: false, value: 500 },
    { id: 10, type: FinanceType.INCOME, isExpense: false, value: 500 },
    { id: 11, type: FinanceType.INCOME, isExpense: false, value: 500 },
    { id: 12, type: FinanceType.INCOME, isExpense: false, value: 500 },
    { id: 13, type: FinanceType.INCOME, isExpense: false, value: 500 },
  ]);
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);

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

  const handleAddNewElem = () => {
    setItems([
      ...items,
      {
        id: Number(new Date()),
        type: FinanceType.EXPENSE,
        category: "еда",
        isExpense: isIncome,
        value: money,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.financeContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Баланс</Text>
          <Text style={styles.balanceValue}>50000</Text>
        </View>
      </View>
      <ScrollView style={styles.elemsContainer} onScroll={onScroll}>
        {items.map(elem => (
          <View key={elem.id} style={styles.elemsEachContainer}>
            <View style={styles.elemsEachContainerLeft}>
              {elem.isExpense ? (
                <View>
                  <Text>{elem.category}</Text>
                  <Text>{elem.comment}</Text>
                </View>
              ) : (
                <View>
                  <Text>Доход</Text>
                </View>
              )}
            </View>
            <View style={styles.elemsEachContainerRight}>
              <Text>{elem.isExpense ? `-${elem.value}` : `+${elem.value}`}</Text>
            </View>
          </View>
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
      <AddModal modalizeRef={modalizeRef}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: "row" }}>
            <Button onPress={() => setIsIncome(true)}>Доход</Button>
            <Button onPress={() => setIsIncome(false)}>Расход</Button>
          </View>
          <TextInput
            autoFocus={true}
            mode="outlined"
            placeholder="Введите сумму"
            onChangeText={text => setMoney(Number(text))}
          />
          {isIncome ? (
            <TextInput mode="outlined" placeholder="Комментарий" />
          ) : (
            <>
              <TextInput mode="outlined" placeholder="Комментарий" />
              <TextInput mode="outlined" placeholder="Категория" />
            </>
          )}
          <Button mode="contained" onPress={handleAddNewElem} style={styles.addButton}>
            Добавить
          </Button>
        </View>
      </AddModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    margin: "5%",
    marginBottom: 0,
  },
  modalContainer: {
    flex: 1,
    gap: 10,
  },
  addButton: {
    flex: 1,
    width: 390,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
  financeContainer: {
    flex: 1,
    position: "absolute",
    height: "100%"
  },
  balanceContainer: {
    marginTop: "10%"
  },
  balanceTitle: {
    fontSize: 15
  },
  balanceValue: {
    fontSize: 30
  },
  elemsContainer: {
    display: "flex",
    width: "100%",
    top: 100,
  },
  elemsEachContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    marginBottom: 8,
  },
  elemsEachContainerRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  elemsEachContainerLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 5,
  },
});
