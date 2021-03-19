import { gql } from "@apollo/client";

const ADD_CAR = gql`
  mutation ADD_CAR(
    $brand: String!
    $model: String!
    $productionYear: String!
    $engineCapacity: String!
    $enginePower: String!
    $available: Boolean!
    $image: Upload
    $owner:String!
  ) {
    addCar(
      brand: $brand
      model: $model
      productionYear: $productionYear
      engineCapacity: $engineCapacity
      enginePower: $enginePower
      available: $available
      image: $image
      owner: $owner
    ) {
      brand
      model
      engineCapacity
      enginePower
      productionYear
      available
      
    }
  }
`;

export default ADD_CAR;