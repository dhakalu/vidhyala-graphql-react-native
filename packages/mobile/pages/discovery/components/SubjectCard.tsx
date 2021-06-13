import { Pressable, StyleSheet } from "react-native";
import Text from "../../../core/components/Text";
import React from "react";
import theme from "../../../core/theme";
import styled from "styled-components/native";

const Wrapper = styled.View`
  margin-bottom: 12px;
  padding-bottom: 12px;
  background-color: ${theme.palette.background.light};
  &:hover {
    transform: translateY(-10px);
  }
`;

const StyledImage = styled.Image`
  height: 300px;
`;

const SubjectCard = ({
  title = "",
  description = "",
  logo = "",
  onPress = () => false,
}) => {
  return (
    <Wrapper>
      <Pressable onPress={onPress}>
        <Text variant={"xLarge"} color="primary" style={styles.name}>
          {title}
        </Text>
        <Text variant={"medium"} color="secondary" style={styles.name}>
          {description}
        </Text>
        <StyledImage style={styles.logo} source={{ uri: logo }} />
      </Pressable>
    </Wrapper>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  name: {
    justifyContent: "center",
    paddingTop: 17,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  logo: {
    height: 200,
  },
});
