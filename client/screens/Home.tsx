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
      model
      productionYear
      engineCapacity
      enginePower
      available
      image {
        path
        mimetype
      }
    }
  }
`;
interface CarsProps {
  brand: string;
  model: string;
  productionYear: string;
  engineCapacity: string;
  enginePower: string;
  available: boolean;
  date: string;
  image: any;
}
const Home = () => {
  const { loading, error, data } = useQuery(GET_CARS);

  if (error) {
    console.log(error.message);
  }
  if (loading) return <Text>"Loading..."</Text>;
  console.log(data);
  return (
    <ScreenWrapper>
      <Heading text="Ostatnio dodane samochody" />
      {data.cars.map((car: CarsProps, index: number) => (
        <CarBox
          key={index}
          brand={car.brand}
          model={car.model}
          engineCapacity={car.engineCapacity}
          enginePower={car.enginePower}
          productionYear={car.productionYear}
          available={car.available}
          imgSrc={car.image.path}
        />
      ))}
    </ScreenWrapper>
  );
};
export default Home;
