import * as React from "react";
import { Text } from "react-native";
import AccountWrapper from "./styled/AccountWrapper";
import LogoutButton from "./styled/LogoutButton";
import LogoutText from "./styled/LogoutText";

import { useNavigation } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client";
import { UserContext } from "../../src/contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER_CARS } from "../../src/utils/mutations";
import CarBox from "../CarBox";
import { CarsProps } from "../../screens/Home";
import YourCars from "./styled/YourCars";

const Account = () => {
  const { handleUserChange, user } = React.useContext(UserContext);
  const { error, loading, data } = useQuery(GET_USER_CARS);
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
  if (error) {
    console.log(error.message);
  }
  if (loading) return <Text>"Loading..."</Text>;
  console.log(data.getUserCars);
  return (
    <AccountWrapper>
      <YourCars>Twoje samochody do wypożyczenia</YourCars>
      {data.getUserCars
        .filter((a) => a.borrowedBy !== user["id"])
        .map((car: CarsProps, index: number) => (
          <CarBox
            id={car.id}
            key={index}
            brand={car.brand}
            model={car.model}
            engineCapacity={car.engineCapacity}
            enginePower={car.enginePower}
            productionYear={car.productionYear}
            available={car.available}
            imgSrc={car.image}
            imagePublicId={car.imagePublicId}
            isAccountBox={true}
          />
        ))}
      <YourCars>Aktualnie wypożyczasz</YourCars>
      {data.getUserCars
        .filter((a) => a.borrowedBy === user["id"])
        .map((car: CarsProps, index: number) => (
          <CarBox
            id={car.id}
            key={index}
            brand={car.brand}
            model={car.model}
            engineCapacity={car.engineCapacity}
            enginePower={car.enginePower}
            productionYear={car.productionYear}
            available={car.available}
            imgSrc={car.image}
            imagePublicId={car.imagePublicId}
          />
        ))}
      <LogoutButton onPress={handleLogout}>
        <LogoutText>Wyloguj się</LogoutText>
      </LogoutButton>
    </AccountWrapper>
  );
};
export default Account;
