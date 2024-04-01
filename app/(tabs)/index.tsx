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
  const [items, setItems] = useState<FinanceItem[]>(defaultFinance);
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
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

  const handleAddNewElem = () => {
    setItems([
      ...items,
      {
        id: Number(new Date()),
        title: title,
        type: FinanceType.EXPENSE,
        category: "еда",
        value: money,
        date: new Date(Date.now()),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        <FinanceCard />
        <View style={styles.elemsContainer}>
          {items.map(elem => (
            <View key={elem.id} style={styles.elemsEachContainer}>
              <View style={styles.elemsEachContainerLeft}>
                <Text style={styles.transactionTitle}>{elem.title}</Text>
                <Text style={styles.transactionCategory}>{elem.category}</Text>
              </View>
              <View style={styles.elemsEachContainerRight}>
                <Text
                  style={[styles.transactionCurrency, elem.type === FinanceType.EXPENSE ? null : { color: "green" }]}
                >
                  {elem.type == FinanceType.EXPENSE ? `-${elem.value}` : `+${elem.value}`}₽
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
    justifyContent: "space-evenly",
    gap: 10,
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  elemsContainer: {
    display: "flex",
  },
  elemsEachContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
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
  transactionValueIfIncome: {
    fontSize: 16,
    color: "green",
  },
  transactionValueIfExpense: {
    fontSize: 16,
  },
  transactionCurrency: {
    marginLeft: 3,
    fontSize: 16,
  },
});
