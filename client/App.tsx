import React from "react";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import initApollo from "./src/utils/initApollo";
import MainStackNavigator from "./Navigations/StackNavigator";

const client = initApollo();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
