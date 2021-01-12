import * as React from "react";
import ScreenWrapper from "./styled/ScreenWrapper";
import Heading from "../Components/Heading";
import AddCarForm from "../Components/AddCarForm";

const AddCar = () => {
  return (
    <ScreenWrapper>
      <Heading text="Dodaj swój samochód" />
      <AddCarForm />
    </ScreenWrapper>
  );
};

export default AddCar;
