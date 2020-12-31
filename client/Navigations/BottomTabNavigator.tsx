import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import AsyncStorage from "@react-native-community/async-storage";
import AddCar from "../screens/AddCar";
import AccountScreen from "../screens/AccountScreen";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [token, setToken] = React.useState<string | null>("");

  const getToken = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      setToken(value);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    getToken();
  }, []);
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
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Samochody" component={Home} />
      <Tab.Screen
        name={token ? "Konto" : "Zaloguj się"}
        component={token ? AccountScreen : Login}
      />
      <Tab.Screen name="Dodaj samochód" component={AddCar} />
      <Tab.Screen name={"Zarejestruj się"} component={Register} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
