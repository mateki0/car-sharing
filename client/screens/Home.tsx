import React from "react";
import { Text } from "react-native";
import CarBox from "../Components/CarBox";
import Heading from "../Components/Heading";
import ScreenWrapper from "./styled/ScreenWrapper";
import { gql, useQuery } from "@apollo/client";

const GET_CARS = gql`
  query GET_CARS {
    cars {
      brand
      productionYear
      engineCapacity
      enginePower
    }
  }
`;
interface CarsProps {
  brand: string;
  productionYear: string;
  engineCapacity: string;
  enginePower: string;
}
const Home = () => {
  const { loading, error, data } = useQuery(GET_CARS);
  if (error) {
    console.log(error.message);
  }
  if (loading) return <Text>"Loading..."</Text>;
  return (
    <ScreenWrapper>
      <Heading text="Ostatnio dodane samochody" />
      {data.cars.map((car: CarsProps, index: number) => (
        <CarBox
          key={index}
          brand={car.brand}
          model="Focus"
          engineCapacity={car.engineCapacity}
          enginePower={car.enginePower}
          productionYear={car.productionYear}
          available={true}
        />
      ))}
    </ScreenWrapper>
  );
};
export default Home;
