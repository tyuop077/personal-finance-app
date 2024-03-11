import React, { MutableRefObject } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useTheme } from "react-native-paper";

const AddModal = ({
  modalizeRef,
  children,
}: {
  modalizeRef: MutableRefObject<Modalize | undefined>;
  children: React.ReactNode;
}) => {
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
      >
        {children}
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 100,
  },
});

export default AddModal;
