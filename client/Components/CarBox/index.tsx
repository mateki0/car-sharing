import * as React from "react";
import Available from "./styled/Available";
import Brand from "./styled/Brand";
import CarBoxContainer from "./styled/CarBoxContainer";
import CarImg from "./styled/CarImg";
import Description from "./styled/Description";
import DescriptionWrapper from "./styled/DescriptionWrapper";

interface CarProps {
  brand: string;
  model: string;
  engineCapacity: string;
  enginePower: string;
  productionYear: string;
  available: boolean;
}

const CarBox = ({
  brand,
  model,
  engineCapacity,
  enginePower,
  productionYear,
  available,
}: CarProps) => {
  const capacity = engineCapacity.includes(".") ? "l" : "cm3";
  return (
    <CarBoxContainer>
      <CarImg source={require("./car.png")} />
      <DescriptionWrapper>
        <Brand>{brand}</Brand>
        <Description>
          {model +
            " " +
            engineCapacity +
            "" +
            capacity +
            " " +
            enginePower +
            "km " +
            productionYear}
        </Description>
      </DescriptionWrapper>
      <Available available={available}></Available>
    </CarBoxContainer>
  );
};
export default CarBox;
