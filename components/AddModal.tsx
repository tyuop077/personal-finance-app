import React, { MutableRefObject, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Button, TextInput, useTheme } from "react-native-paper";
import { FinanceType } from "@/modules/finance/finance.model";
import { useRootStore } from "@/hooks/useRootStore";

const AddModal = ({ modalizeRef }: { modalizeRef: MutableRefObject<Modalize | undefined> }) => {
  const theme = useTheme();
  const { finances } = useRootStore();

  const [isIncome, setIsIncome] = useState<boolean>(true);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleAddNewElem = () => {
    finances.addFinanceItem({
      id: Number(new Date()),
      title: title,
      type: isIncome ? FinanceType.INCOME : FinanceType.EXPENSE,
      category: category,
      comment: comment,
      value: money,
      date: new Date(Date.now()),
    });
    modalizeRef.current?.close();
    setCategory("");
    setComment("");
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        avoidKeyboardLikeIOS // avoiding layout bug
        adjustToContentHeight // avoiding layout bug
        disableScrollIfPossible
        childrenStyle={styles.container}
        modalStyle={{ backgroundColor: theme.colors.background }}
      >
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => setIsIncome(true)}
              style={{ backgroundColor: isIncome ? theme.colors.onSecondary : theme.colors.background }}
            >
              Доход
            </Button>
            <Button
              onPress={() => setIsIncome(false)}
              style={{ backgroundColor: isIncome ? theme.colors.background : theme.colors.onSecondary }}
            >
              Расход
            </Button>
          </View>
          <TextInput
            autoFocus={true}
            mode="outlined"
            placeholder={isIncome ? "Введите сумму дохода" : "Введите сумму расхода"}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={text => setMoney(Number(text))}
          />
          <TextInput mode="outlined" placeholder="Заголовок" onChangeText={text => setTitle(text)} />
          <TextInput mode="outlined" placeholder="Комментарий" onChangeText={text => setComment(text)} />
          <TextInput mode="outlined" placeholder="Категория" onChangeText={text => setCategory(text)} />
          <Button mode="contained" onPress={handleAddNewElem} style={styles.addButton}>
            Добавить
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 40,
  },
  modalContainer: {
    flex: 1,
    gap: 10,
  },
  addButton: {
    flex: 1,
    width: 390,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default AddModal;
