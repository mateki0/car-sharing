import * as React from "react";
import Heading from "../Components/Heading";
import Account from "../Components/Account";
import { UserContext } from "../contexts/UserContext";
import Layout from "../Components/Layout";

const AccountScreen = () => {
  const { user } = React.useContext(UserContext);
  return (
    <Layout>
      <Heading
        text={`Witaj ${user["email"].slice(0, user["email"].indexOf("@"))}`}
      />
      <Account />
    </Layout>
  );
};
export default AccountScreen;
