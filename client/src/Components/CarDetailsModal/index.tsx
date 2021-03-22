import * as React from 'react';
import { Modal, View } from "react-native";
import ButtonText from '../AccountForms/styled/ButtonText';
import CarBorrowModal from '../CarBorrowModal';
import DetailSmallBox from '../DetailSmallBox';
import CarImage from './styled/CarImage';
import DetailBoxesContainer from './styled/DetailBoxesContainer';
import DetailCarBrand from './styled/DetailCarBrand';
import DetailCarDescription from './styled/DetailCarDescription';
import DetailCarDescriptionWrapper from './styled/DetailCarDescriptionWrapper';
import DetailCarModel from './styled/DetailCarModel';
import DetailsModalInnerWrapper from './styled/DetailModalInnerWrapper';
import OpenBorrowModalButton from './styled/OpenBorrowModalButton';

interface CarDetailsModalProps {
  brand: string;
  model: string;
  enginePower:string;
  engineCapacity:string;
  description?:string;
  isCarDetailsModalOpened: boolean;
  handleCarDetailsModalClose: () => void;
  owner: string | undefined;
  imgSrc: string;
}

const CarDetailsModal = ({
  brand,
  model,
  enginePower,
  engineCapacity,
  description,
  isCarDetailsModalOpened,
  handleCarDetailsModalClose,
  owner,
  imgSrc,
}: CarDetailsModalProps) => {

  const [isBorrowModalOpened, setIsBorrowModalOpened] = React.useState(false);
  
  const handleBorrowModalOpen = () => {
    setIsBorrowModalOpened(true);
  }

  const handleBorrowModalClose = () => {
    setIsBorrowModalOpened(false);
  }

  return(
    <View>
      <Modal 
        animationType="slide"
        visible={isCarDetailsModalOpened}
        onRequestClose={handleCarDetailsModalClose}
        transparent={true}>
          <DetailsModalInnerWrapper>
            <View>
            <CarImage source={{uri:imgSrc}} />
            <DetailBoxesContainer>
              <DetailSmallBox valueName="KM" value={enginePower}/>
              <DetailSmallBox valueName="Silnik" value={engineCapacity + 'L'}/>
            </DetailBoxesContainer>
            </View>
            <DetailCarDescriptionWrapper>
              <DetailCarBrand>{brand}</DetailCarBrand>
              <DetailCarModel>{model}</DetailCarModel>
              <DetailCarDescription>{description}</DetailCarDescription>
            </DetailCarDescriptionWrapper>
            <OpenBorrowModalButton onPress={handleBorrowModalOpen}><ButtonText>Wypożycz</ButtonText></OpenBorrowModalButton>
          </DetailsModalInnerWrapper>
      </Modal>
      <CarBorrowModal 
        brand={brand}
        model={model}
        isModalOpened={isBorrowModalOpened}
        handleModalClose={handleBorrowModalClose}
        owner={owner}
      
      />
    </View>
  )
}

export default CarDetailsModal;