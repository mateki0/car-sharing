import * as React from "react";
import { Text } from "react-native";
import ScreenWrapper from "./styled/ScreenWrapper";
import Heading from "../Components/Heading";
import AddCarForm from "../Components/AddCarForm";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../src/utils/mutations";
import { UserContext } from "../src/contexts/UserContext";
const AddCar = () => {
  const { loading, error, data } = useQuery(GET_USER);
  const { user } = React.useContext(UserContext);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    console.log("error");
  }
  console.log("user", data);
  return (
    <ScreenWrapper>
      <Heading text="Dodaj swój samochód" />
      <AddCarForm />
    </ScreenWrapper>
  );
};

export default AddCar;
