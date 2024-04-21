import React, { MutableRefObject, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useRootStore } from "@/hooks/useRootStore";

const EditAndDeleteModal = ({ modalizeRef, selectedItemIndex }: { modalizeRef: MutableRefObject<Modalize | undefined>, selectedItemIndex: number | null }) => {
  const theme = useTheme();
  const {finances } = useRootStore();

  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (selectedItemIndex === null)
      return;

    const selectedItem = finances.financeModel.items[selectedItemIndex];
    setMoney(selectedItem.value);
    setTitle(selectedItem.title);
    if (selectedItem.comment !== undefined)
      setComment(selectedItem.comment);
    if (selectedItem.category !== undefined)
      setCategory(selectedItem.category);
  }, [selectedItemIndex]);

  const handleEditElem = () => {
    if (selectedItemIndex !== null) {
      const selectedItem = finances.financeModel.items[selectedItemIndex];
      finances.editFinanceItem(
        selectedItemIndex,
        {
          id: selectedItem.id,
          title: title,
          type: selectedItem.type,
          comment: comment,
          category: category,
          value: money,
          date: selectedItem.date
        })
    }
    modalizeRef.current?.close()
  };

  const handleDeleteElem = () => {
    if (selectedItemIndex !== null)
      finances.deleteFinanceItem(selectedItemIndex)
    modalizeRef.current?.close()
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
            keyboardType="numeric"
            mode="outlined"
            placeholder="Введите сумму"
            value={money.toString()}
            onChangeText={text => setMoney(Number(text))}
          />
          <TextInput
            mode="outlined"
            placeholder="title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          {isIncome ? (
            <TextInput
              mode="outlined"
              placeholder="Комментарий"
              value={comment}
              onChangeText={text => setComment(text)}
            />
          ) : (
            <>
              <TextInput
                mode="outlined"
                placeholder="Комментарий"
                value={comment}
                onChangeText={text => setComment(text)}
              />
              <TextInput mode="outlined"
                         placeholder="Категория"
                         value={category}
                         onChangeText={text => setCategory(text)}
              />
            </>
          )}
          <Button mode="contained" onPress={handleEditElem} style={styles.addButton}>
            Изменить
          </Button>
          <Button mode="contained" onPress={handleDeleteElem} style={styles.addButton}>
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
  addButton: {
    flex: 1,
    width: 390,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default EditAndDeleteModal;
