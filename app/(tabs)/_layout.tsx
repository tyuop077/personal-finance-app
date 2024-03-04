import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { MaterialBottomTabs } from "../../components/Tabs";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialIcons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MaterialBottomTabs>
      <MaterialBottomTabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: props => <MaterialIcons name="home" {...props} size={24} />,
        }}
      />
      <MaterialBottomTabs.Screen
        name="two"
        options={{
          title: "Заметки",
          tabBarIcon: props => <MaterialIcons name="create" {...props} size={24} />,
        }}
      />
    </MaterialBottomTabs>
  );
}
