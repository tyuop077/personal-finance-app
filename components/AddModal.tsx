import React, { MutableRefObject, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Text, useTheme } from "react-native-paper";

const AddModal = ({ modalizeRef }: { modalizeRef: MutableRefObject<Modalize | undefined> }) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        avoidKeyboardLikeIOS // avoiding layout bug
        adjustToContentHeight // avoiding layout bug
        disableScrollIfPossible
        childrenStyle={styles.container}
        modalStyle={{ backgroundColor: theme.colors.background }}
        handleStyle={{ backgroundColor: theme.colors.onSurfaceVariant }}
      >
        <Text>test</Text>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
  },
});

export default AddModal;
