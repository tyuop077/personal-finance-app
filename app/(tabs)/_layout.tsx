import React from "react";
import { MaterialBottomTabs } from "@/components/Tabs";

export default function TabLayout() {
  return (
    <MaterialBottomTabs>
      <MaterialBottomTabs.Screen
        name="index"
        options={{
          title: "Счёт",
          tabBarIcon: "account-circle",
        }}
      />
      <MaterialBottomTabs.Screen
        name="stats"
        options={{
          title: "Статистика",
          tabBarIcon: "chart-arc",
        }}
      />
    </MaterialBottomTabs>
  );
}
