import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  MD3LightTheme,
  PaperProvider,
  configureFonts,
  MD3Theme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import AwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FeatherIcons from "@expo/vector-icons/Feather";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { StatusBar } from "expo-status-bar";
import { Inter_400Regular, Inter_500Medium, Inter_900Black } from "@expo-google-fonts/inter";
import { DarkColors, LightColors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host as PortalizeHost } from "react-native-portalize";
import { DefaultTheme as RNLight, ThemeProvider, DarkTheme as RNDark } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import {RealmProvider} from '@realm/react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (Platform.OS === "android") {
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setBackgroundColorAsync("#ffffff00");
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    Inter_400Regular,
    Inter_500Medium,
    Inter_900Black,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightColors,
  },
};

const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkColors,
  },
};

const commonTheme: Partial<MD3Theme> = {
  // same in light and dark themes
  fonts: configureFonts({
    isV3: true,
    config: {
      fontFamily: "Inter_500Medium",
    },
  }),
};

interface IconPropsRoot extends IconProps<any> {
  name: string;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const md3Theme = {
    ...(colorScheme === "dark" ? darkTheme : lightTheme),
    ...commonTheme,
  };

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: RNLight,
    reactNavigationDark: RNDark,
    materialLight: lightTheme,
    materialDark: darkTheme,
  });

  return (
    <RealmProvider>
      <PaperProvider
        theme={md3Theme}
        settings={{
          icon: (props: IconPropsRoot) => {
            let [provider, icon] = props.name.split("/");
            if (!icon) {
              icon = provider;
              provider = "material-community";
            }
            const iconProps = { ...props, name: icon };
            switch (provider) {
              case "awesome":
                // @ts-ignore
                return <AwesomeIcon {...iconProps} />;
              case "material-community":
                // @ts-ignore
                return <MaterialCommunityIcons {...iconProps} />;
              case "feather":
                // @ts-ignore
                return <FeatherIcons {...iconProps} />;
            }
          },
        }}
      >
        <ThemeProvider value={colorScheme === "light" ? LightTheme : DarkTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
            <PortalizeHost>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal", title: "test modal" }} />
                <Stack.Screen name="settings" options={{ headerShown: false }} />
              </Stack>
            </PortalizeHost>
          </GestureHandlerRootView>
        </ThemeProvider>
      </PaperProvider>
    </RealmProvider>
  );
}
