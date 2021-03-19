import { gql } from "@apollo/client";

const CHECK_BORROW_DATE = gql`
  mutation CHECK_BORROW_DATE{
    checkBorrowDate{
      brand
    }
  }
`

export default CHECK_BORROW_DATE;