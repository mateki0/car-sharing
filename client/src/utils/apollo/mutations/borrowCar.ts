import { gql } from "@apollo/client";

const BORROW_CAR = gql`
  mutation BORROW_CAR(
    $id: String!
    $borrowedBy:String!
    $borrowedFrom:String!
    $borrowedTo: String!
  ) {
    borrowCar(id:$id, borrowedBy:$borrowedBy, borrowedFrom:$borrowedFrom, borrowedTo:$borrowedTo){
      brand
    }
  }
`

export default BORROW_CAR;