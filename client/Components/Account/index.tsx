import * as React from "react";
import AccountWrapper from "./styled/AccountWrapper";
import LogoutButton from "./styled/LogoutButton";
import LogoutText from "./styled/LogoutText";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client";
import { UserContext } from "../../src/contexts/UserContext";

const Account = () => {
  const { handleUserChange } = React.useContext(UserContext);
  const client = useApolloClient();
  const Navigation = useNavigation();
  const handleLogout = async () => {
    client.resetStore();
    try {
      await AsyncStorage.removeItem("x-token");
      handleUserChange("");
      Navigation.navigate("Samochody");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AccountWrapper>
      <LogoutButton onPress={handleLogout}>
        <LogoutText>Wyloguj się</LogoutText>
      </LogoutButton>
    </AccountWrapper>
  );
};
export default Account;
