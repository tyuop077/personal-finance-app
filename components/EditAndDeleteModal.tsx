import React, { MutableRefObject, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Button, TextInput, useTheme } from "react-native-paper";
import { FinanceItem } from "@/modules/finance/finance.model";
import { useRootStore } from "@/hooks/useRootStore";

const EditAndDeleteModal = ({ modalizeRef, selectedItem }: { modalizeRef: MutableRefObject<Modalize | undefined>, selectedItem: FinanceItem | null }) => {
  const theme = useTheme();
  const {finances } = useRootStore();

  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  if (selectedItem !== null) {
    if (money !== selectedItem.value)
      setMoney(selectedItem.value);

    if (title !== selectedItem.title)
      setTitle(selectedItem.title);

    if (comment !== selectedItem.comment && selectedItem.comment !== undefined)
        setComment(selectedItem.comment);

    if (category !== selectedItem.category && selectedItem.category !== undefined)
        setCategory(selectedItem.category);
  }

  const handleEditElem = () => {
    if (selectedItem !== null) {
      finances.editFinanceItem({
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
    if (selectedItem !== null)
      finances.deleteFinanceItem(selectedItem.id)
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
            defaultValue={money.toString()}
            onChangeText={text => setMoney(Number(text))}
          />
          <TextInput
            mode="outlined"
            placeholder="title"
            defaultValue={title}
            onChangeText={text => setTitle(text)}
          />
          {isIncome ? (
            <TextInput
              mode="outlined"
              placeholder="Комментарий"
              defaultValue={comment}
              onChangeText={text => setComment(text)}
            />
          ) : (
            <>
              <TextInput
                mode="outlined"
                placeholder="Комментарий"
                defaultValue={comment}
                onChangeText={text => setComment(text)}
              />
              <TextInput mode="outlined"
                         placeholder="Категория"
                         defaultValue={category}
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
