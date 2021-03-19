import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client"
import { UserContext } from "../../contexts/UserContext";
const Logout = () => {
  const { handleUserChange } = React.useContext(UserContext);
  const client = useApolloClient();
  const Navigation = useNavigation();
  const handleLogout = async () => {
    client.resetStore();

    try {
      handleUserChange({
        email: "",
        id: "",
      });
      Navigation.navigate("Samochody");

    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(()=> {handleLogout()})
  return null
}

export default Logout;