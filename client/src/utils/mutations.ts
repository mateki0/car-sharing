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
      brand
      model
      productionYear
      engineCapacity
      enginePower
      available
      image
      date
    }
  }
`;
export const ADD_CAR = gql`
  mutation ADD_CAR(
    $brand: String!
    $model: String!
    $productionYear: String!
    $engineCapacity: String!
    $enginePower: String!
    $available: Boolean!
    $image: Upload
  ) {
    addCar(
      brand: $brand
      model: $model
      productionYear: $productionYear
      engineCapacity: $engineCapacity
      enginePower: $enginePower
      available: $available
      image: $image
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
