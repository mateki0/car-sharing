import React from "react";
import AccountForms from "../Components/AccountForms";
import Heading from "../Components/Heading";
import Layout from "../Components/Layout";

const Register = () => {
  return (
    <Layout>
      <Heading text="Załóż konto" />
      <AccountForms />
    </Layout>
  );
};
export default Register;
