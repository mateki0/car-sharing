import * as React from "react";
import ScreenWrapper from "./styled/ScreenWrapper";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ActivityIndicator } from "react-native";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (error) {
    console.log(error);
  }

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff"/>;
  }
  
  return (
    <ScreenWrapper customFont={"Roboto_400Regular"}>{children}</ScreenWrapper>
  );
};
export default Layout;
