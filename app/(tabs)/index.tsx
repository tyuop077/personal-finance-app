import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FAB, Button, TextInput } from "react-native-paper";
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
  title: string;
  type: FinanceType;
  value: number;
  comment?: string;
  category?: string;
  date: Date;
}

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);
  const modalizeRef = useRef<Modalize>();
  const { finances } = useRootStore();
  const [items, setItems] = useState<FinanceItem[]>([
    { id: 1, title: "Обед на работе", type: FinanceType.EXPENSE, category: "Еда", comment: "comment", value: 1200, date: new Date(Date.now()) },
    { id: 2, title: "Батончик", type: FinanceType.EXPENSE, category: "Еда", comment: "comment", value: 1200, date: new Date(Date.now()) },
    { id: 3, title: "Затарился в Ашане", type: FinanceType.EXPENSE, category: "Еда", comment: "comment", value: 1200, date: new Date(Date.now()) },
    { id: 4, title: "Орехи из лавки", type: FinanceType.EXPENSE, category: "Еда", comment: "comment", value: 1200, date: new Date(Date.now()) },
    { id: 5, title: "Поужинал в ресторане", type: FinanceType.EXPENSE, category: "Еда", comment: "comment", value: 1200, date: new Date(Date.now()) },
    { id: 6, title: "Лукойл", type: FinanceType.INCOME, category: "Дивиденды", comment: "comment", value: 1000, date: new Date(Date.now()) },
    { id: 7, title: "Иванов А.П.", type: FinanceType.INCOME, category: "Фриланс", comment: "comment", value: 20000, date: new Date(Date.now()) },
    { id: 8, title: "ЗП АК БАРС", type: FinanceType.INCOME, category: "Зарплата", comment: "comment", value: 60000, date: new Date(Date.now()) },
    { id: 9, title: "Сургутнефтегаз", type: FinanceType.INCOME, category: "Дивиденды", comment: "comment", value: 500, date: new Date(Date.now()) },
    { id: 10, title: "Соколов В. А.", type: FinanceType.INCOME, category: "Фриланс", comment: "comment", value: 500, date: new Date(Date.now()) },
    { id: 11, title: "Зарплата КФУ", type: FinanceType.INCOME, category: "Зарплата", comment: "comment", value: 500, date: new Date(Date.now()) },
    { id: 12, title: "Зарплата КФУ", type: FinanceType.INCOME, category: "Зарплата", comment: "comment", value: 500, date: new Date(Date.now()) },
    { id: 13, title: "Позитив", type: FinanceType.INCOME, category: "Дивиденды", comment: "comment", value: 500, date: new Date(Date.now()) },
  ]);
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");


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
        date: new Date(Date.now())
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
              <View>
                <Text style={styles.transactionTitle}>{elem.title}</Text>
              </View>
              <View>
                <Text style={styles.transactionCategory}>{elem.category}</Text>
              </View>
            </View>
            <View style={styles.elemsEachContainerRight}>
                <Text style={styles.transactionValue}>{elem.type == FinanceType.EXPENSE ? `-${elem.value}` : `+${elem.value}`}</Text>
                <Text style={styles.transactionCurrency}>₽</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        mode={"elevated"}
        onPress={handleAdd}
        animated={false}
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
          <Button mode="contained" onPress={handleAddNewElem} style={styles.addButton}>Добавить</Button>
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
  fabStyle: {
    bottom: "10%",
    right: "15%",
    borderRadius: 30,
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
  elemsEachContainerLeft: {
    flex: 1,
    alignItems: "flex-start",
    width: 1000,
    flexDirection: "column",
  },
  transactionTitle: {
    fontSize: 16,
  },
  transactionCategory: {
    fontSize: 13
  },
  elemsEachContainerRight: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    width: "30%",
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
