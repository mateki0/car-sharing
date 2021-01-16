import React from "react";
import AccountForms from "../Components/AccountForms";
import Heading from "../Components/Heading";
import Layout from "../Components/Layout";

const Login = () => {
  return (
    <Layout>
      <Heading text="Zaloguj się" />
      <AccountForms isLogin={true} />
    </Layout>
  );
};
export default Login;
