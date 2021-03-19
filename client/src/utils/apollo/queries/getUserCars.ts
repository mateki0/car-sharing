import { gql } from "@apollo/client";

const GET_USER_CARS = gql`
  query GET_USER_CARS {
    getUserCars{
      id
      brand
      model
      productionYear
      engineCapacity
      enginePower
      available
      image
      imagePublicId
      date
      borrowedBy
    }
  }
`

export default GET_USER_CARS;