import * as React from "react";

import Heading from "../Components/Heading";
import AddCarForm from "../Components/AddCarForm";
import Layout from "../Components/Layout";

const AddCar = () => {
  return (
    <Layout>
      <Heading text="Dodaj swój samochód" />
      <AddCarForm />
    </Layout>
  );
};

export default AddCar;
