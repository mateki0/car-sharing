import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={BottomTabNavigator} />
      <Stack.Screen name="Register" component={BottomTabNavigator} />
      <Stack.Screen name="AccountScreen" component={BottomTabNavigator} />
      <Stack.Screen name="AddCar" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
