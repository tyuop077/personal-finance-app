import React, { MutableRefObject, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Button, TextInput, useTheme } from "react-native-paper";
import { FinanceItem, FinanceType } from "@/modules/finance/finance.model";
import { useRootStore } from "@/hooks/useRootStore";

const EditAndDeleteModal = ({ modalizeRef, selectedItem }: { modalizeRef: MutableRefObject<Modalize | undefined>, selectedItem: FinanceItem | null }) => {
  const theme = useTheme();
  const {finances } = useRootStore();

  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  if (selectedItem !== null) {
    if (money !== selectedItem.value)
      setMoney(selectedItem.value);
  }

  const handleAddNewElem = () => {
    finances.addFinanceItem({
      id: Number(new Date()),
      title: title,
      type: FinanceType.EXPENSE,
      category: "еда",
      value: money,
      date: new Date(Date.now()),
    });
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
          <TextInput
            autoFocus={true}
            mode="outlined"
            placeholder="Введите сумму"
            value={money.toString()}
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
            Изменить
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
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default EditAndDeleteModal;
