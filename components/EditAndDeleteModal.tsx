import React, { MutableRefObject, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useRootStore } from "@/hooks/useRootStore";
import { FieldsConstants } from "@/constants/FieldsConstants";

const EditAndDeleteModal = ({
  modalizeRef,
  selectedItemIndex,
  setSelectedItemIndex,
}: {
  modalizeRef: MutableRefObject<Modalize | undefined>;
  selectedItemIndex: number | null;
  setSelectedItemIndex: (index: number | null) => void;
}) => {
  const theme = useTheme();
  const { finances } = useRootStore();

  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const selectedItem = selectedItemIndex ? finances.financeModel.items[selectedItemIndex] : null;

  useEffect(() => {
    if (!selectedItem) return;

    setMoney(selectedItem.value);
    setTitle(selectedItem.title);
    if (selectedItem.comment !== undefined) setComment(selectedItem.comment);
    if (selectedItem.category !== undefined) setCategory(selectedItem.category);
  }, [selectedItemIndex]);

  const handleEditElem = () => {
    if (selectedItemIndex !== null && selectedItem) {
      finances.editFinanceItem(selectedItemIndex, {
        id: selectedItem.id,
        title: title,
        type: selectedItem.type,
        comment: comment,
        category: category,
        value: money,
        date: selectedItem.date,
      });
    }
    setSelectedItemIndex(null);
    modalizeRef.current?.close();
  };

  const handleDeleteElem = () => {
    if (selectedItem) finances.deleteFinanceItem(selectedItem.id);
    setSelectedItemIndex(null);
    modalizeRef.current?.close();
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
            mode="outlined"
            placeholder="title"
            value={title}
            maxLength={FieldsConstants.titleLengthLimit}
            onChangeText={text => setTitle(text)} />
          <TextInput
            autoFocus={true}
            keyboardType="numeric"
            mode="outlined"
            placeholder={"Введите сумму"}
            value={money.toString()}
            maxLength={FieldsConstants.valueLengthLimit}
            onChangeText={text => setMoney(Number(text))}
          />
          <TextInput
            mode="outlined"
            placeholder="Комментарий"
            value={comment}
            maxLength={FieldsConstants.commentLengthLimit}
            onChangeText={text => setComment(text)}
          />
          <TextInput
            mode="outlined"
            placeholder="Категория"
            value={category}
            maxLength={FieldsConstants.categoryLengthLimit}
            onChangeText={text => setCategory(text)}
          />
          <Button mode="contained" onPress={handleEditElem} style={styles.button}>
            Изменить
          </Button>
          <Button mode="contained" onPress={handleDeleteElem} style={styles.button}>
            Удалить
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
  button: {
    flex: 1,
    width: 390,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default EditAndDeleteModal;
