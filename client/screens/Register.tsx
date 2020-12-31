import React from "react";
import AccountForms from "../Components/AccountForms";
import Heading from "../Components/Heading";
import ScreenWrapper from "./styled/ScreenWrapper";

const Register = () => {
  return (
    <ScreenWrapper>
      <Heading text="Załóż konto" />
      <AccountForms />
    </ScreenWrapper>
  );
};
export default Register;
