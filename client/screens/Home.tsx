import React from "react";
import { Text } from "react-native";
import CarBox from "../Components/CarBox";
import Heading from "../Components/Heading";
import ScreenWrapper from "./styled/ScreenWrapper";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../src/utils/mutations";
import AvailableFilter from "../Components/AvailableFilter/AvailableFilter";

interface CarsProps {
  brand: string;
  model: string;
  productionYear: string;
  engineCapacity: string;
  enginePower: string;
  available: boolean;
  date: string;
  image: string;
}
const Home = () => {
  const { loading, error, data } = useQuery(GET_CARS);

  const [availableOnly, setAvailableOnly] = React.useState(true);

  const toggleAvailable = () => {
    setAvailableOnly(!availableOnly);
  };
  if (error) {
    console.log(error.message);
  }
  if (loading) return <Text>"Loading..."</Text>;

  if (data) {
    const cars = availableOnly
      ? data.cars.filter(
          ({ available }: { available: boolean }) => available === true
        )
      : data.cars;

    return (
      <ScreenWrapper>
        <Heading text="Ostatnio dodane samochody" />
        <AvailableFilter
          availableOnly={availableOnly}
          toggleAvailable={toggleAvailable}
        />
        {cars.map((car: CarsProps, index: number) => (
          <CarBox
            key={index}
            brand={car.brand}
            model={car.model}
            engineCapacity={car.engineCapacity}
            enginePower={car.enginePower}
            productionYear={car.productionYear}
            available={car.available}
            imgSrc={car.image}
          />
        ))}
      </ScreenWrapper>
    );
  } else {
    return <Text>Loading</Text>;
  }
};
export default Home;
