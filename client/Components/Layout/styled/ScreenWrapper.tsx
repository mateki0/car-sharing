import styled from "styled-components/native";
import { StatusBar } from "react-native";
const ScreenWrapper = styled.ScrollView<{ customFont: string }>`
  margin-top: ${StatusBar.currentHeight}px;
  padding: 10px 10px 0 10px;
  background-color: #161616;
  color: #ebebeb;
  height: 100%;
  font-family: ${(props) => props.customFont};
`;
export default ScreenWrapper;
