import React from "react";
import { Pressable, View, Text, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import theme from "../theme";

type NavigationPillProps = {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
};

const Wrapper = styled.View`
  background-color: ${theme.palette.background.dark};
  margin-right: 12px;
  padding: 8px;
  border-radius: 8px;
  font-weight: 600;
`;

const NavigationPill = ({ title = "", onPress }: NavigationPillProps) => {
  return (
    <Pressable onPress={onPress}>
      <Wrapper>
        <Text>{title}</Text>
      </Wrapper>
    </Pressable>
  );
};

export default NavigationPill;
