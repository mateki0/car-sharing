import * as React from "react";

import ScreenWrapper from "./styled/ScreenWrapper";
import Heading from "../Components/Heading";
import Account from "../Components/Account";

const AccountScreen = () => {
  return (
    <ScreenWrapper>
      <Heading text="Witaj xyz" />
      <Account />
    </ScreenWrapper>
  );
};
export default AccountScreen;
