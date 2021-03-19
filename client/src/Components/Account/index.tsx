import * as React from "react";
import { ActivityIndicator } from "react-native";
import {  useQuery } from "@apollo/client"
import AccountWrapper from "./styled/AccountWrapper";
import { UserContext } from "../../contexts/UserContext";
import CarBox from "../CarBox";
import { CarsProps } from "../../screens/Home";
import YourCars from "./styled/YourCars";
import GET_USER_CARS from "../../utils/apollo/queries/getUserCars";


const Account = () => {
  const { user } = React.useContext(UserContext);
  const { error, loading, data } = useQuery(GET_USER_CARS);
  const [isAnyBorrowed, setIsAnyBorrowed] = React.useState(false);
  
  React.useEffect(() => {
    const checkIfUserHasBorrowedCars = data && data.getUserCars ? data.getUserCars.some(a => a.borrowedBy === user['id']) : false;
    setIsAnyBorrowed(checkIfUserHasBorrowedCars);
  },[data])

  
  
  if (error) {
    console.log(error.message);
  }

  if (loading) return <ActivityIndicator size="large" color="#0000ff"/>;
  
  return (
    <AccountWrapper>
      <YourCars>Twoje samochody</YourCars>
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
        {isAnyBorrowed && 
        <>
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
        </>
        }
    </AccountWrapper>
  );
};
export default Account;
