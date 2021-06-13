import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const Input = ({ multiline = false, numberOfLines = 1, ...otherProps }) => {
  let minHeight = 20;

  if (multiline) {
    minHeight = numberOfLines * 20;
  }

  return (
    <View>
      <TextInput multiline={multiline} {...otherProps} />
    </View>
  );
};

export default Input;
