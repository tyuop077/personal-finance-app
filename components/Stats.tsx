import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { monthNames } from "@/constants/monthNames";
import { List } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { FinanceItem, FinanceType } from "@/modules/finance/finance.model";
import { GraphColors } from "@/constants/Colors";
import { useRootStore } from "@/hooks/useRootStore";

interface CategoryDataItem {
  id: string;
  category: string;
  sum: number;
  operationCount: number;
  color: string;
}

interface Props {
  tempData: Map<string | undefined, FinanceItem[]>;
  isExpense: boolean;
}

export default function Stats({ tempData, isExpense }: Props) {
  const { finances } = useRootStore();
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [sum, setSum] = useState(0);
  const [graphData, setGraphData] = useState<pieDataItem[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataItem[]>([]);
  const theme = useTheme();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    // finances.getFinances();
    getFinances();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFinances();
    setRefreshing(false);
  }, []);

  const getFinances = () => {
    let startDate = new Date(currentYear, currentMonth, 1);
    let endDate = getNextDate(currentYear, currentMonth);
    // let finance = finances.getFinanceItemsByDateRange(isExpense, startDate, endDate);
    let finance = tempData;
    let sum = 0;

    finance.forEach((value, key) => {
      value.forEach(item => {
        sum += item.value;
      });
    });

    let index = 0;
    let graphData: pieDataItem[] = [];
    let categoryData: CategoryDataItem[] = [];

    finance.forEach((value, key) => {
      let valueSum = 0;
      value.forEach(item => {
        valueSum += item.value;
      });

      graphData.push({ value: (valueSum / sum) * 100, color: GraphColors[index] });
      categoryData.push({
        id: index.toString(),
        category: key!,
        color: GraphColors[index],
        sum: valueSum,
        operationCount: value.length,
      });

      index += 1;
    });

    categoryData.sort((a, b) => b.sum - a.sum);

    setGraphData(graphData);
    setCategoryData(categoryData);
    setSum(sum);
  };

  const getNextDate = (year: number, month: number) => {
    if (month + 1 > 11) {
      return new Date(year + 1, 0, 1);
    } else {
      return new Date(year, month + 1, 1);
    }
  };

  const emptyData = [{ value: 100, color: "#808080" }];

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.baseContainer}>
        <Text style={{ fontSize: 24 }}>{sum.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</Text>
        <View style={styles.container}>
          <PieChart
            data={graphData.length == 0 ? emptyData : graphData}
            donut
            showGradient
            sectionAutoFocus
            radius={100}
            innerRadius={80}
            innerCircleColor={theme.colors.tertiaryContainer}
            centerLabelComponent={() => {
              return (
                <View style={styles.container}>
                  <Text style={[styles.month, { color: theme.colors.onTertiaryContainer }]}>
                    {monthNames[currentMonth]}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>Категории</Text>
          <List.Section>
            {categoryData.length == 0 ? (
              <List.Item title="Нет расходов" />
            ) : (
              categoryData.map(item => (
                <List.Item
                  title={item.category}
                  key={item.id}
                  description={
                    <Text>
                      {item.operationCount} {item.operationCount == 1 ? "операция" : "операции"}
                    </Text>
                  }
                  left={() => (
                    <View style={styles.container}>
                      <View style={[styles.circle, { backgroundColor: item.color }]} />
                    </View>
                  )}
                  right={() => <Text>{item.sum.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</Text>}
                />
              ))
            )}
          </List.Section>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    padding: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 24,
  },
  month: {
    fontSize: 16,
  },
});
