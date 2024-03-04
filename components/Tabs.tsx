import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationProp,
  MaterialBottomTabNavigationEventMap,
  MaterialBottomTabScreenProps,
} from "react-native-paper/react-navigation";

import { ParamListBase, StackNavigationState } from "@react-navigation/native";

import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator);
