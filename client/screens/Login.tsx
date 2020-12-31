import React from "react";
import AccountForms from "../Components/AccountForms";
import Heading from "../Components/Heading";
import ScreenWrapper from "./styled/ScreenWrapper";

const Login = () => {
  return (
    <ScreenWrapper>
      <Heading text="Zaloguj się" />
      <AccountForms isLogin={true} />
    </ScreenWrapper>
  );
};
export default Login;
