import React from "react";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import initApollo from "./src/utils/initApollo";
import MainStackNavigator from "./src/Navigations/StackNavigator";
import { UserProvider } from "./src/contexts/UserContext";

const client = initApollo();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
