import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, Snackbar, useTheme } from "react-native-paper";
import { Portal } from "react-native-paper";
import { useState } from "react";

const TestBanner = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

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
  },
});

export default TestBanner;
