import { gql } from "@apollo/client";

const GET_USER = gql`
  query me {
    me {
      id
      email
    }
  }
`

export default GET_USER;