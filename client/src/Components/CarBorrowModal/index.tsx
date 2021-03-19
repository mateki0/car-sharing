import * as React from "react";
import { Modal, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonText from "../AccountForms/styled/ButtonText";
import BorrowButton from "./styled/BorrowButton";
import ModalContainer from "./styled/ModalContainer";
import ModalInnerWrapper from "./styled/ModalInnerWrapper";
import DateButtonsWrapper from "./styled/DateButtonsWrapper";
import DateButton from "./styled/DateButton";
import BorrowDate from "./styled/BorrowDate";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import ModelBrand from "./styled/ModelBrand";
import BORROW_CAR from "../../utils/apollo/mutations/borrowCar";

interface ModalProps {
  isModalOpened: boolean;
  brand: string;
  model: string;
  handleModalClose: () => void;
  id?: string;
  owner?: string;
}

const CarBorrowModal = ({
  isModalOpened,
  id,
  brand,
  model,
  handleModalClose,
  owner,
}: ModalProps) => {
  const navigation = useNavigation();
  
  const [borrowCar] = useMutation(BORROW_CAR, {
    onCompleted: () => navigation.navigate("Samochody"),
  });

  const minimumDate = moment(new Date(), "DD-MM-YYYY").add(1, "days").toDate();
  const maximumDate = moment(new Date(), "DD-MM-YYYY").add(14, "days").toDate();
  const [dateFrom, setDateFrom] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(minimumDate);
  const [pickerFromVisible, setPickerFromVisible] = React.useState(false);
  const [pickerToVisible, setPickerToVisible] = React.useState(false);
  const { user } = React.useContext(UserContext);

  const handleDateFromChange = (e, selectedDate) => {
    if (selectedDate !== undefined) {
      const currentDate = selectedDate;
      setPickerFromVisible(false);
      setDateFrom(currentDate);
    }
  };

  const handleDateToChange = (e, selectedDate) => {
    if (selectedDate !== undefined) {
      const currentDate = selectedDate;
      setPickerToVisible(false);
      setDateTo(currentDate);
    }
  };

  const handleBorrowCar = () => {
    if (owner === user["id"]) {
      alert("Nie można wypożyczyć swojego samochodu");
    } else {
      borrowCar({
        variables: {
          id,
          borrowedBy: user["id"],
          borrowedFrom: dateFrom,
          borrowedTo: dateTo,
        },
      });
    }
  };

  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        visible={isModalOpened}
        onRequestClose={handleModalClose}
        transparent={true}
      >
        <ModalInnerWrapper>
          <DateButtonsWrapper>
            <ModelBrand>
              {brand} {model}
            </ModelBrand>
          </DateButtonsWrapper>
          <DateButtonsWrapper>
            <DateButton onPress={() => setPickerFromVisible(true)}>
              <ButtonText>Wypożycz od</ButtonText>
            </DateButton>
            <BorrowDate>{moment(dateFrom).format("DD-MM-YYYY")}</BorrowDate>
            <DateButton onPress={() => setPickerToVisible(true)}>
              <ButtonText>Wypożycz do</ButtonText>
            </DateButton>
            <BorrowDate>{moment(dateTo).format("DD-MM-YYYY")}</BorrowDate>
          </DateButtonsWrapper>

          {pickerFromVisible ? (
            <DateTimePicker
              value={dateFrom}
              display="default"
              onChange={handleDateFromChange}
              minimumDate={dateFrom}
            />
          ) : (
            <Text></Text>
          )}
          {pickerToVisible ? (
            <DateTimePicker
              value={dateTo}
              display="default"
              onChange={handleDateToChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          ) : (
            <Text></Text>
          )}
          <BorrowButton onPress={handleBorrowCar}>
            <ButtonText>Wypożycz</ButtonText>
          </BorrowButton>
        </ModalInnerWrapper>
      </Modal>
    </ModalContainer>
  );
};
export default CarBorrowModal;
