import styled from "styled-components/native";
import theme from "../theme";

const Wrapper = styled.View`
  margin-bottom: 12px;
  padding-bottom: 12px;
  background-color: ${theme.palette.background.light};
  &:hover {
    transform: translateY(-10px);
  }
  padding: ${theme.spacing.small}px;
`;

export default Wrapper;
