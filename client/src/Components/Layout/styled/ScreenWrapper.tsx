import styled from "styled-components/native";
import { StatusBar } from "react-native";

const ScreenWrapper = styled.ScrollView<{ customFont: string }>`
  margin-top: ${StatusBar.currentHeight}px;
  padding: 10px 10px 0 10px;
  background-color: #EBEBEB;
  color: #FEF7E9;
  flex:1;
  font-family: ${(props) => props.customFont};
`;

export default ScreenWrapper;
