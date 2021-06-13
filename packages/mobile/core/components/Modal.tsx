import React, { ReactNode } from "react";
import { Modal as NativeModal, Portal, Provider } from "react-native-paper";
import theme from "../theme";

type DiscussionFormProps = {
  onDismiss: Function;
  isOpen: boolean;
  children: ReactNode;
};

const Modal = ({
  isOpen = false,
  onDismiss = () => false,
  children = null,
}: DiscussionFormProps) => {
  return (
    <Provider>
      <Portal>
        <NativeModal
          visible={isOpen}
          contentContainerStyle={{
            padding: theme.spacing.xLarge,
            backgroundColor: theme.palette.background.main,
          }}
          style={{
            margin: "auto", // This is the important style you need to set
            alignItems: undefined,
            justifyContent: undefined,
            flex: 1,
          }}
          dismissable={false}
          onDismiss={onDismiss}
        >
          {children}
        </NativeModal>
      </Portal>
    </Provider>
  );
};

export default Modal;
