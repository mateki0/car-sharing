import {  gql } from "@apollo/client";

export const GET_USER = gql`
  query me {
    me {
      id
      email
    }
  }
`
export const GET_CARS = gql`
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
export const GET_USER_CARS = gql`
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
export const CHECK_BORROW_DATE = gql`
  mutation CHECK_BORROW_DATE{
    checkBorrowDate{
      brand
    }
  }
`
export const BORROW_CAR = gql`
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
export const DELETE_CAR = gql`
  mutation DELETE_CAR(
    $carId:String!
    $imagePublicId:String!
  ){
    deleteCar(carId:$carId, imagePublicId:$imagePublicId){
      brand
    }
  }
`
export const ADD_CAR = gql`
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

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const INSERT_USER = gql`
mutation INSERT_USER($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    id
    email
  }
}
`;
