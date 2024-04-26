import React, { MutableRefObject, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Button, TextInput, useTheme } from "react-native-paper";
import { FinanceType } from "@/modules/finance/finance.model";
import { useRootStore } from "@/hooks/useRootStore";
import { FieldsConstants } from "@/constants/FieldsConstants";
import { ButtonGroup } from '@rneui/themed';
import { TouchableOpacity } from "react-native-gesture-handler";
import { number } from "prop-types";

const AddModal = ({
  modalizeRef,
  setSelectedItemIndex,
}: {
  modalizeRef: MutableRefObject<Modalize | undefined>;
  setSelectedItemIndex: (index: number | null) => void;
}) => {
  const theme = useTheme();
  const { finances } = useRootStore();

  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [money, setMoney] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);


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
    setSelectedItemIndex(finances.financeModel.items.length - 1);
    modalizeRef.current?.close();
    setCategory("");
    setComment("");
  };

  const handleTransactionType = (index: number) => {
    setSelectedIndex(index)
    if (index === 0) {
      setIsIncome(false)
    }
    else
      setIsIncome(true)
  }

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
            <ButtonGroup
              Component={TouchableOpacity}
              activeOpacity={0.6}
              containerStyle={buttonGroupStyles.containerStyle}
              buttonStyle={buttonGroupStyles.buttonStyle}
              selectedButtonStyle={{...buttonGroupStyles.selectedButtonStyle,
                backgroundColor: theme.colors.elevation.level5,
              }}
              textStyle={{...buttonGroupStyles.textStyle, color: theme.colors.primary}}
              selectedTextStyle={{color: theme.colors.primary}}
              innerBorderStyle={{color: "transparent"}}
              buttons={[
                'Доход', 'Расход'
              ]}
              selectedIndex={selectedIndex}
              onPress={(selectedIndex) => handleTransactionType(selectedIndex)}
            />

          </View>
          <TextInput
            maxLength={FieldsConstants.titleLengthLimit}
            mode="outlined"
            placeholder="Заголовок"
            onChangeText={text => setTitle(text)} />
          <TextInput
            autoFocus={true}
            mode="outlined"
            placeholder={isIncome ? "Введите сумму дохода" : "Введите сумму расхода"}
            keyboardType="numeric"
            maxLength={FieldsConstants.valueLengthLimit}
            onChangeText={text => setMoney(Number(text))}
          />
          <TextInput
            maxLength={FieldsConstants.commentLengthLimit}
            mode="outlined" placeholder="Комментарий"
            onChangeText={text => setComment(text)} />
          <TextInput maxLength={FieldsConstants.categoryLengthLimit} mode="outlined" placeholder="Категория" onChangeText={text => setCategory(text)} />
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
  }
});

const buttonGroupStyles = StyleSheet.create({
  containerStyle: {
    width: "40%",
    height: "100%",
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  buttonStyle: {
    padding: 8
  },
  selectedButtonStyle: {
    borderRadius: 30
  },
  textStyle: {
    fontSize: 16, fontFamily: "sans-serif-medium"
  }
})

export default AddModal;
