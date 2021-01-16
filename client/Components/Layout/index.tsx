import * as React from "react";
import ScreenWrapper from "./styled/ScreenWrapper";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (error) {
    console.log(error);
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScreenWrapper customFont={"Roboto_400Regular"}>{children}</ScreenWrapper>
  );
};
export default Layout;
