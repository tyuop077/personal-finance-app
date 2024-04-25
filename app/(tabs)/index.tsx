import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { AnimatedFAB, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddModal from "@/components/AddModal";
import EditAndDeleteModal from "@/components/EditAndDeleteModal";
import { Modalize } from "react-native-modalize";
import { useRootStore } from "@/hooks/useRootStore";
import { FinanceType } from "@/modules/finance/finance.model";
import { FinanceCard } from "@/components/FinanceCard";

export default function TabOneScreen() {
  const [isExtended, setIsExtended] = React.useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number | null>(null);
  const addModalizeRef = useRef<Modalize>();
  const editModalizeRef = useRef<Modalize>();
  const { finances } = useRootStore();
  const theme = useTheme();

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    finances.getFinances();
  }, []);

  const handleAdd = () => {
    setSelectedItemIndex(null);
    addModalizeRef.current?.open();
  };

  const handleEditOrDelete = (itemIndex: number) => {
    setSelectedItemIndex(itemIndex);
    editModalizeRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        <FinanceCard />
        <View style={styles.elemsContainer}>
          {finances.financeModel.items.map((elem, index) => (
            <View key={elem.id}>
              <TouchableHighlight
                onPress={_ => handleEditOrDelete(index)}
                delayPressIn={100}
                underlayColor={theme.colors.outlineVariant}
              >
                <View style={styles.elemsEachContainer}>
                  <View style={styles.elemsEachContainerLeft}>
                    <Text style={styles.transactionTitle}>{elem.title}</Text>
                    <Text style={styles.transactionCategory}>{elem.category}</Text>
                  </View>
                  <View style={styles.elemsEachContainerRight}>
                    <Text
                      style={[styles.transactionValue, elem.type === FinanceType.EXPENSE ? null : { color: "green" }]}
                    >
                      {elem.type == FinanceType.EXPENSE ? `-` : `+`}
                      {elem.value.toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        minimumFractionDigits: 0,
                      })}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
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
      <EditAndDeleteModal
        modalizeRef={editModalizeRef}
        selectedItemIndex={selectedItemIndex}
        setSelectedItemIndex={setSelectedItemIndex}
      />
      <AddModal modalizeRef={addModalizeRef} setSelectedItemIndex={setSelectedItemIndex}></AddModal>
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
    paddingBottom: 50,
  },
  elemsEachContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  elemsEachContainerLeft: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  transactionTitle: {
    fontSize: 15,
  },
  transactionCategory: {
    fontSize: 13,
  },
  elemsEachContainerRight: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  transactionValue: {
    fontSize: 15,
  },
});
