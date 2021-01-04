import {  gql } from "@apollo/client";

// export const ADD_IMAGE = gql`
//   mutation ADD_IMAGE(
//     $file: Upload
//   ){
//     uploadImage(
//       file:$file
//     ){
//     filename
//     }
//   }
// `
export const ADD_CAR = gql`
  mutation ADD_CAR(
    $brand: String!
    $model: String!
    $productionYear: String!
    $engineCapacity: String!
    $enginePower: String!
    $available: Boolean!
    $file: Upload
  ) {
    addCar(
      brand: $brand
      model: $model
      productionYear: $productionYear
      engineCapacity: $engineCapacity
      enginePower: $enginePower
      available: $available
      file: $file
    ) {
      brand
      model
      engineCapacity
      enginePower
      productionYear
      available
      path
      id
      filename
      mimetype
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
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
