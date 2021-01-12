import * as React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import AddCar from "../screens/AddCar";
import AccountScreen from "../screens/AccountScreen";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../src/utils/mutations";
import { UserContext } from "../src/contexts/UserContext";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const { loading, error, data } = useQuery(GET_USER);
  const { user } = React.useContext(UserContext);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    console.log("error");
  }
  // pobrac usera z query, wrzucic do contextu, wyciagnac w add car

  React.useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false);
  }, [user]);

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
      {isLogged ? (
        <>
          <Tab.Screen name="Samochody" component={Home} />
          <Tab.Screen name="Konto" component={AccountScreen} />
          <Tab.Screen name="Dodaj samochód" component={AddCar} />
          <Tab.Screen name="Zarejestruj się" component={Register} />
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
