import React from "react";
import { View, ActivityIndicator } from "react-native";
import CarBox from "../Components/CarBox";
import Heading from "../Components/Heading";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import AvailableFilter from "../Components/AvailableFilter/AvailableFilter";
import Layout from "../Components/Layout";
import GET_CARS from "../utils/apollo/queries/getCars";
import CHECK_BORROW_DATE from "../utils/apollo/mutations/checkBorrowDate";
import GET_USER from "../utils/apollo/queries/getUser";
import { UserContext } from "../contexts/UserContext";

export interface CarsProps {
  id: string;
  brand: string;
  model: string;
  productionYear: string;
  engineCapacity: string;
  enginePower: string;
  available: boolean;
  date: string;
  image: string;
  owner: string;
  borrowedTo: string;
  imagePublicId?: string;
}
const Home = () => {
  const {loading:userLoading, data:userData} = useQuery(GET_USER);
  const { loading, error, data } = useQuery(GET_CARS);
  const [checkBorrowDate] = useMutation(CHECK_BORROW_DATE);
  const [availableOnly, setAvailableOnly] = React.useState(true);
  const { handleUserChange } = React.useContext(UserContext);

  const toggleAvailable = () => {
    setAvailableOnly(!availableOnly);
  };

  React.useEffect(() => {
    checkBorrowDate();
  }, []);

  React.useEffect(()=>{
    if(!userLoading && userData){
      handleUserChange({email:userData.me.email, id:userData.me.id})
    }
  },[userData, userLoading])

  if (error) {
    console.log(error.message);
  }

  if (loading) return (<Layout><ActivityIndicator size="large" color="#0000ff"/></Layout>);

  if(!loading && !data.cars.length){
    return(<Layout><Heading text="Brak Dodanych Samochodów" /></Layout>) 
  }
  
  if (data) {
    const cars = availableOnly
      ? data.cars.filter(
          ({ available }: { available: boolean }) => available === true
        )
      : data.cars;

    return (
      <Layout>
        <Heading text="Ostatnio dodane samochody" />
        <AvailableFilter
          availableOnly={availableOnly}
          toggleAvailable={toggleAvailable}
        />
        {cars.map((car: CarsProps, index: number) => (
          <View key={index}>
            <CarBox
              id={car.id}
              brand={car.brand}
              model={car.model}
              engineCapacity={car.engineCapacity}
              enginePower={car.enginePower}
              productionYear={car.productionYear}
              available={car.available}
              imgSrc={car.image}
              owner={car.owner}
              borrowedTo={car.borrowedTo}
            />
          </View>
        ))}
      </Layout>
    );
  } else {
    return <ActivityIndicator size="large" color="#0000ff"/>
  }
};
export default Home;
