import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import AddCar from "../screens/AddCar";
import AccountScreen from "../screens/AccountScreen";
import { UserContext } from "../contexts/UserContext";
import Logout from "../Components/Logout";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { user } = React.useContext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "tomato" : "gray";
          if (route.name === "Samochody") {
            iconName = "ios-home";
          } else if (route.name === "Zaloguj się") {
            iconName = "ios-log-in";
          } else if (route.name === "Konto") {
            iconName = "ios-man";
          } else if (route.name === "Dodaj samochód") {
            iconName = "ios-add-circle";
          } else if (route.name === "Zarejestruj się") {
            iconName = "ios-person-add";
          } else if (route.name === "Wyloguj się") {
            iconName = "ios-log-out";
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      {user["email"] ? (
        <>
          <Tab.Screen name="Samochody" component={Home} />
          <Tab.Screen name="Konto" component={AccountScreen} />
          <Tab.Screen name="Dodaj samochód" component={AddCar} />
          <Tab.Screen name="Wyloguj się" component={Logout} />
        </>
      ) : (
        <>
          <Tab.Screen name="Samochody" component={Home} />
          <Tab.Screen name="Zaloguj się" component={Login} />
          <Tab.Screen name="Zarejestruj się" component={Register} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
