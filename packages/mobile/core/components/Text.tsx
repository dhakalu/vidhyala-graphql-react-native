import React from "react";
import { Text as NativeText } from "react-native";
import styled from "styled-components/native";
import TextStyles from "./textStyles";

type TextProps = {
  variant?: string;
  color?: string;
  children: any;
  style?: any;
};

interface TextWrapperProps {
  color: string;
  variant: string;
}

const TextWrapper = styled(NativeText)<TextWrapperProps>`
  ${(props) => TextStyles[props.variant]};
`;

const Text = ({
  variant = "medium",
  color = "primary",
  children = null,
  style = {},
}: TextProps) => {
  return (
    <TextWrapper color={color} variant={variant} style={style}>
      {children}
    </TextWrapper>
  );
};

export default Text;
