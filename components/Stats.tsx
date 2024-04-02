import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text, List, useTheme } from "react-native-paper";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { monthNames } from "@/constants/monthNames";
import React, { useEffect, useState } from "react";
import { FinanceType } from "@/modules/finance/finance.model";
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
  financeType: FinanceType;
}

export default function Stats({ financeType }: Props) {
  const {finances} = useRootStore();
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [sum, setSum] = useState(0);
  const [graphData, setGraphData] = useState<pieDataItem[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataItem[]>([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const theme = useTheme();

  useEffect(() => {
    finances.getFinances();
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
    let finance = finances.getFinanceItemsByDateRange(financeType, startDate, endDate);
    let sum = 0;

    finance.forEach((value) => {
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

  const declinationOperations = (count: number) => {
    const singular: number[] = [2, 3, 4];
    const plural: number[] = [0, 5, 6, 7, 8, 9];

    if((11 <= count % 100 && count % 100 <= 14) || plural.includes(count % 10)) {
      return "операций";
    } else if(singular.includes(count % 10)){
      return "операции"
    } else return "операция"
  }

  const emptyData = [{ value: 100, color: "#808080" }];

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.baseContainer}>
        <Text style={{ fontSize: 24, color: theme.colors.onBackground }}>
          {sum.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
        </Text>
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
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Категории</Text>
          <List.Section>
            {categoryData.length == 0 ? (
              <List.Item title="Нет операций" />
            ) : (
              categoryData.map(item => (
                <List.Item
                  title={item.category}
                  key={item.id}
                  description={
                    <Text>
                      {item.operationCount} {declinationOperations(item.operationCount)}
                    </Text>
                  }
                  left={() => (
                    <View style={styles.container}>
                      <View style={[styles.circle, { backgroundColor: item.color }]} />
                    </View>
                  )}
                  right={() => (
                    <Text style={[{ color: theme.colors.onBackground }]}>
                      {item.sum.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
                    </Text>
                  )}
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
