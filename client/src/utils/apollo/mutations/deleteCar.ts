import { gql } from "@apollo/client";

const DELETE_CAR = gql`
  mutation DELETE_CAR(
    $carId:String!
    $imagePublicId:String!
  ){
    deleteCar(carId:$carId, imagePublicId:$imagePublicId){
      brand
    }
  }
`

export default DELETE_CAR;