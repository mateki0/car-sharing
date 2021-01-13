import * as React from "react";
import Available from "./styled/Available";
import Brand from "./styled/Brand";
import CarBoxContainer from "./styled/CarBoxContainer";
import CarImg from "./styled/CarImg";
import Description from "./styled/Description";
import DescriptionWrapper from "./styled/DescriptionWrapper";
import CarBorrowModal from "../CarBorrowModal";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { DELETE_CAR } from "../../src/utils/mutations";
import BorrowButton from "../CarBorrowModal/styled/BorrowButton";
import ButtonText from "../AccountForms/styled/ButtonText";
import { Text } from "react-native";
interface CarProps {
  id?: string;
  brand: string;
  model: string;
  engineCapacity: string;
  enginePower: string;
  productionYear: string;
  available: boolean;
  imgSrc: string;
  owner?: string;
  borrowedTo?: string;
  isAccountBox?: boolean;
}

const CarBox = ({
  brand,
  model,
  engineCapacity,
  enginePower,
  productionYear,
  available,
  imgSrc,
  id,
  owner,
  borrowedTo,
  isAccountBox,
}: CarProps) => {
  const [deleteCar] = useMutation(DELETE_CAR);
  const [isModalOpened, setModalOpened] = React.useState(false);
  const capacity = engineCapacity.includes(".") ? "l" : "cm3";

  const handleModalOpen = () => {
    const borrowedToDate = borrowedTo
      ? moment(borrowedTo, "x").format("DD-MM-YYYY")
      : "";

    available
      ? setModalOpened(true)
      : alert(`To auto jest wypożyczone do ${borrowedToDate}`);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleDeleteCar = () => {
    console.log(id);
    deleteCar({ variables: { carId: id } });
  };
  return (
    <>
      <CarBoxContainer onPress={handleModalOpen}>
        <CarImg
          source={{
            uri: imgSrc,
          }}
        />
        <DescriptionWrapper>
          <Brand>{brand}</Brand>
          <Description>
            {model +
              " " +
              engineCapacity +
              "" +
              capacity +
              " " +
              enginePower +
              "km " +
              productionYear}
          </Description>
        </DescriptionWrapper>
        <Available available={available}></Available>
        {isAccountBox ? (
          <BorrowButton onPress={handleDeleteCar}>
            <ButtonText>X</ButtonText>
          </BorrowButton>
        ) : (
          <Text></Text>
        )}
      </CarBoxContainer>
      <CarBorrowModal
        id={id}
        brand={brand}
        model={model}
        isModalOpened={isModalOpened}
        handleModalClose={handleModalClose}
        owner={owner}
      />
    </>
  );
};
export default CarBox;
