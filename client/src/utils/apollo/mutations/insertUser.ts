import { gql } from "@apollo/client";

const INSERT_USER = gql`
mutation INSERT_USER($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    id
    email
  }
}
`;

export default INSERT_USER;