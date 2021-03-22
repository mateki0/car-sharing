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
import { Text } from "react-native";
import DeleteButtonsContainer from "./styled/DeleteButtonsContainer";
import DeleteModal from "../DeleteModal";
import AvailableWrapper from "./styled/AvailableWrapper";
import CarImgWrapper from "./styled/CarImgWrapper";
import LogoutButton from "../Account/styled/LogoutButton";
import LogoutText from "../Account/styled/LogoutText";
import DELETE_CAR from "../../utils/apollo/mutations/deleteCar";
import CarDetailsModal from "../CarDetailsModal";

interface CarProps {
  id?: string;
  brand: string;
  model: string;
  engineCapacity: string;
  enginePower: string;
  productionYear: string;
  description?:string;
  available: boolean;
  imgSrc: string;
  owner?: string;
  borrowedTo?: string;
  isAccountBox?: boolean;
  imagePublicId?: string;
}

const CarBox = ({
  brand,
  model,
  engineCapacity,
  enginePower,
  productionYear,
  description,
  available,
  imgSrc,
  id,
  owner,
  borrowedTo,
  isAccountBox,
  imagePublicId,
}: CarProps) => {
  const [deleteCar] = useMutation(DELETE_CAR);
  const [isCarDetailsModalOpened, setCarDetailsModalOpened] = React.useState(false);
  const [isDeleteModalOpened, setDeleteModalOpened] = React.useState(false);
  

  const handleCarDetailsModalOpen = () => {
    const borrowedToDate = borrowedTo
      ? moment(borrowedTo, "x").format("DD-MM-YYYY")
      : "";

    available
      ? setCarDetailsModalOpened(true)
      : alert(`To auto jest wypożyczone do ${borrowedToDate}`);
  };

  const handleCarDetailsModalClose = () => {
    setCarDetailsModalOpened(false);
  };

  const handleDeleteCar = () => {
    deleteCar({ variables: { carId: id, imagePublicId } });
    handleDeleteModalClose();
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpened(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpened(false);
  };

  return (
    <>
      <CarBoxContainer
        onPress={isAccountBox ? handleDeleteModalOpen : handleCarDetailsModalOpen}
      >
        <CarImgWrapper>
          <CarImg
            source={{
              uri: imgSrc,
            }}
          />
        </CarImgWrapper>
        <DescriptionWrapper>
          <Brand>{brand}</Brand>
          <Description>{model}</Description>
          <Description>
            {productionYear+' r.'}
          </Description>
        </DescriptionWrapper>
        <AvailableWrapper>
          <Available available={available}></Available>
        </AvailableWrapper>
      </CarBoxContainer>
      {isAccountBox ? (
        <>
          <DeleteButtonsContainer>
            <LogoutButton onPress={handleDeleteModalOpen}>
              <LogoutText>Usuń ten samochód</LogoutText>
            </LogoutButton>
          </DeleteButtonsContainer>

          <DeleteModal
            brand={brand}
            model={model}
            isDeleteModalOpened={isDeleteModalOpened}
            handleDeleteModalClose={handleDeleteModalClose}
            handleDeleteCar={handleDeleteCar}
          />
        </>
      ) : (
        <Text></Text>
      )}
      <CarDetailsModal
        brand={brand}
        model={model}
        enginePower={enginePower}
        engineCapacity={engineCapacity}
        description={description}
        isCarDetailsModalOpened={isCarDetailsModalOpened}
        handleCarDetailsModalClose={handleCarDetailsModalClose}
        owner={owner}
        imgSrc={imgSrc}
      />
    </>
  );
};
export default CarBox;
