import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { AnimatedFAB, Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddModal from "@/components/AddModal";
import { Modalize } from "react-native-modalize";

enum ElemType {
  INCOME = "Доход",
  EXPENSE = "Расход",
}

interface FinanceElem {
  id: number;
  elemType: ElemType;
  money: number;
  comment?: string;
  category?: string;
  isExpense: boolean;
}

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);
  const modalizeRef = useRef<Modalize>();
  const [elems, setElems] = useState<FinanceElem[]>([
    { id: 1, elemType: ElemType.EXPENSE, category: "еда", comment: "comment", isExpense: true, money: 1200 },
    { id: 2, elemType: ElemType.EXPENSE, category: "еда", comment: "comment", isExpense: true, money: 1200 },
    { id: 3, elemType: ElemType.EXPENSE, category: "еда", comment: "comment", isExpense: true, money: 1200 },
    { id: 4, elemType: ElemType.EXPENSE, category: "еда", comment: "comment", isExpense: true, money: 1200 },
    { id: 5, elemType: ElemType.EXPENSE, category: "еда", comment: "comment", isExpense: true, money: 1200 },
    { id: 6, elemType: ElemType.INCOME, isExpense: false, money: 1000 },
    { id: 7, elemType: ElemType.INCOME, isExpense: false, money: 20000 },
    { id: 8, elemType: ElemType.INCOME, isExpense: false, money: 60000 },
    { id: 9, elemType: ElemType.INCOME, isExpense: false, money: 500 },
  ]);
  const [isCome, setIsCome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleAdd = () => {
    modalizeRef.current?.open();
  };

  const handleAddNewElem = () => {
    setElems([
      ...elems,
      {
        id: Number(new Date()),
        elemType: ElemType.EXPENSE,
        category: "еда",
        comment: "",
        isExpense: isCome,
        money: money,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.financeContainer}>
        <View style={styles.incomesContainer}>
          <Text>Доходы</Text>
          <Text>50000</Text>
        </View>
        <View style={styles.expensesContainer}>
          <Text>Рассходы</Text>
          <Text>100000</Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.elemsContainer} onScroll={onScroll}>
        {elems.map(elem => (
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
              <Text>{elem.isExpense ? `-${elem.money}` : `+${elem.money}`}</Text>
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
          <View style={{ width: 450, height: 100, flex: 1, justifyContent: "center", flexDirection: "row" }}>
            <Button onPress={() => setIsCome(true)}>Доход</Button>
            <Button onPress={() => setIsCome(false)}>Рассход</Button>
          </View>
          <View>
            <TextInput
              autoFocus={true}
              placeholder={"Введите сумму"}
              onChangeText={text => setMoney(Number(text))}
              style={{ width: 500, height: 50 }}
            />
            {isCome ? (
              <View>
                <TextInput placeholder={"Комментарий"} style={{ width: 500, height: 50 }} />
              </View>
            ) : (
              <View style={{ width: 400 }}>
                <TextInput placeholder={"Комментарий"} style={{ width: 300, height: 50 }} />
                <TextInput placeholder={"Категория"} style={{ width: 300, height: 50 }} />
              </View>
            )}
          </View>
          <Button onPress={handleAddNewElem} style={styles.addButton}>
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
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    width: 410,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  incomesContainer: {
    flex: 1,
    alignItems: "center",
    width: 200,
    height: 100,
  },
  expensesContainer: {
    flex: 1,
    alignItems: "center",
    width: 200,
    height: 100,
  },
  elemsContainer: {
    display: "flex",
    width: 410,
  },
  elemsEachContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    height: 50,
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
