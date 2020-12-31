import styled from "styled-components/native";
import { StatusBar } from "react-native";
const ScreenWrapper = styled.ScrollView`
  margin-top: ${StatusBar.currentHeight}px;
  padding-top: 10px;
  background-color: #fff;

  height: 100%;
`;
export default ScreenWrapper;
