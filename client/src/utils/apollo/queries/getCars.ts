import { gql } from "@apollo/client";

const GET_CARS = gql`
  query GET_CARS {
    cars {
      id
      brand
      model
      productionYear
      engineCapacity
      enginePower
      available
      image
      date
      owner
      borrowedTo
    }
  }
`;

export default GET_CARS;