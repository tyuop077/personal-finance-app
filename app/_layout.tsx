import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MD3LightTheme, PaperProvider, adaptNavigationTheme, configureFonts, MD3Theme } from "react-native-paper";
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
import Colors from "../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host as PortalizeHost } from "react-native-portalize";

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

const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...Colors,
  },
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

  return (
    <PaperProvider
      theme={theme}
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
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalizeHost>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </PortalizeHost>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
