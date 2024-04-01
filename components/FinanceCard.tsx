import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import React from "react";

export const FinanceCard = () => {
  const theme = useTheme();

  return (
    <View style={styles.financeContainer}>
      <View style={[styles.balanceContainer, { backgroundColor: theme.colors.secondaryContainer }]}>
        <Text style={[styles.balanceTitle, { color: theme.colors.onSecondaryContainer }]}>Баланс</Text>
        <Text style={[styles.balanceValue, { color: theme.colors.onSecondaryContainer }]}>50000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  financeContainer: {
    flex: 1,
    padding: 15,
  },
  balanceContainer: {
    borderRadius: 25,
    padding: 15,
  },
  balanceTitle: {
    fontSize: 15,
  },
  balanceValue: {
    fontSize: 30,
  },
});
