import styled from "styled-components/native";
import { colors } from "./colors";

const Card = styled.View`
  background-color: #000;
  border-radius: 8px;
  padding: ${({ p }) => (p ? `${p}px` : "16px")};
  border-color: ${colors.accents_3};
  border-width: 1px;
  background-color: ${colors.accents_1};
`;

export { Card };
