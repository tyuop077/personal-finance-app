import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function Expenses() {
  const pieData = [
    {value: 47, color: '#009FFF'},
    {value: 40, color: '#93FCF8'},
    {value: 16, color: '#BDB2FA'},
    {value: 3, color: '#FFA5BA'},
  ];


  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        radius={75}
        innerRadius={60}
        centerLabelComponent={() => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 14}}>Март</Text>
            </View>
          );
        }}
      />
    </View>
  )
}