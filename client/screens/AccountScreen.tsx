import * as React from "react";

import ScreenWrapper from "./styled/ScreenWrapper";
import Heading from "../Components/Heading";
import Account from "../Components/Account";
import { UserContext } from "../src/contexts/UserContext";

const AccountScreen = () => {
  const { user } = React.useContext(UserContext);
  return (
    <ScreenWrapper>
      <Heading
        text={`Witaj ${user["email"].slice(0, user["email"].indexOf("@"))}`}
      />
      <Account />
    </ScreenWrapper>
  );
};
export default AccountScreen;
