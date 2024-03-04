import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { IconButton, Snackbar } from "react-native-paper";
import { Portal } from "react-native-paper";
import { useState } from "react";

const TestBanner = () => {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <IconButton mode="contained-tonal" icon="feather/moon" onPress={onToggleSnackBar} />
      <Portal>
        <View style={styles.container}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "ОК",
            }}
          >
            test notification
          </Snackbar>
        </View>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 85,
    ...(Platform.OS === "web" ? { pointerEvents: "none" } : {}),
  },
});

export default TestBanner;
