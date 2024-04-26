import { Dimensions, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text, List, useTheme } from "react-native-paper";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { monthNames } from "@/constants/monthNames";
import React, { useEffect, useState } from "react";
import { FinanceType } from "@/modules/finance/finance.model";
import { GraphColors } from "@/constants/Colors";
import { useRootStore } from "@/hooks/useRootStore";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import { Container } from "postcss";
import { set } from "mobx";


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

interface MonthData {
  graphData: pieDataItem[]
  categoryData: CategoryData[]
  sum: number
  startDate: Date,
  endDate: Date
}

interface CategoryData {
  id: string;
  category: string;
  color: string;
  sum: number;
  operationCount: number;
}

const PAGE_WIDTH = Dimensions.get("window").width;

export default function Stats({ financeType }: Props) {
  const { finances } = useRootStore();
  const [sum, setSum] = useState(0);
  const [data, setData] = useState<Array<MonthData>>([]);
  const [globalIndex, setGlobalIndex] = useState<number>(0);
  const theme = useTheme();

  const indexToDate = (index: number) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let targetMonth = (currentMonth - index) % 12;
    let targetYear = currentYear - Math.floor((currentMonth - index) / 12);

    return new Date(targetYear, targetMonth, 1);
  };

  const getChartFinances = (index: number): MonthData => {
    let startDate = indexToDate(index);
    let endDate = getNextDate(startDate.getFullYear(), startDate.getMonth());
    let finance = finances.getFinanceItemsByDateRange(financeType, startDate, endDate);
    let sum = 0;

    finance.forEach(value => {
      value.forEach(item => {
        sum += item.value;
      });
    });

    let colorIndex = 0;
    let graphData: pieDataItem[] = [];
    let categoryData: CategoryDataItem[] = [];

    finance.forEach((value, key) => {
      let valueSum = 0;
      value.forEach(item => {
        valueSum += item.value;
      });

      graphData.push({ value: (valueSum / sum) * 100, color: GraphColors[colorIndex++] });

      categoryData.push({
        id: colorIndex.toString(),
        category: key!,
        color: GraphColors[colorIndex],
        sum: valueSum,
        operationCount: value.length,
      });

      colorIndex += 1;
    });
    categoryData.sort((a, b) => b.sum - a.sum);
    return { graphData: graphData, categoryData: categoryData, sum: sum, startDate: startDate, endDate: endDate };
  };


  const getNextDate = (year: number, month: number) => {
    if (month + 1 > 11) {
      return new Date(year + 1, 0, 1);
    } else {
      return new Date(year, month + 1, 1);
    }
  };

  const chart = (index: number) => {
    setGlobalIndex(index);
    return (
      <View style={styles.container}>
        <PieChart
          data={data[index].graphData.length == 0 ? emptyData : data[index].graphData}
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
                  {monthNames[data[index].startDate.getMonth()]}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const declinationOperations = (count: number) => {
    const singular: number[] = [2, 3, 4];
    const plural: number[] = [0, 5, 6, 7, 8, 9];

    if ((11 <= count % 100 && count % 100 <= 14) || plural.includes(count % 10)) {
      return "операций";
    } else if (singular.includes(count % 10)) {
      return "операции";
    } else return "операция";
  };

  const emptyData = [{ value: 100, color: "#808080" }];

  useEffect(() => {
    setData([getChartFinances(2), getChartFinances(1), getChartFinances(0)]);
  }, []);

  if (data.length == 0) {
    return (
      <View style={styles.container}></View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        <Text style={{ fontSize: 24, color: theme.colors.onBackground }}>
          {data[globalIndex].sum.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
          })}
        </Text>

        <Carousel
          width={PAGE_WIDTH - 30}
          height={PAGE_WIDTH * 0.8}
          style={{
            width: "auto",
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 0,
          }}
          data={data}
          loop={false}
          renderItem={({ index }) => chart(index)}
          onScrollEnd={(index: number) => {
            if (index <= 1) {
              setData([getChartFinances(data.length), getChartFinances(data.length + 1), getChartFinances(data.length + 2), ...data]);
              // setGlobalIndex(index + 3);
            }
          }}
        />

        <View>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Категории</Text>
          <List.Section>
            {data[globalIndex].categoryData.length == 0 ? (
              <List.Item title="Нет операций" />
            ) : (
              data[globalIndex].categoryData.map(item => (
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
                      {item.sum.toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        minimumFractionDigits: 0,
                      })}
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
