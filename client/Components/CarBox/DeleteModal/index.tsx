import * as React from "react";
import { Modal } from "react-native";
import ButtonText from "../../AccountForms/styled/ButtonText";
import ModalContainer from "../../CarBorrowModal/styled/ModalContainer";
import ModalInnerWrapper from "../../CarBorrowModal/styled/ModalInnerWrapper";
import ModelBrand from "../../CarBorrowModal/styled/ModelBrand";
import DeleteModalButton from "./styled/DeleteModalButton";

interface DeleteModalProps {
  brand: string;
  model: string;
  isDeleteModalOpened: boolean;
  handleDeleteModalClose: () => void;
  handleDeleteCar: () => void;
}

const DeleteModal = ({
  brand,
  model,
  isDeleteModalOpened,
  handleDeleteModalClose,
  handleDeleteCar,
}: DeleteModalProps) => {
  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        visible={isDeleteModalOpened}
        onRequestClose={handleDeleteModalClose}
        transparent={true}
      >
        <ModalInnerWrapper>
          <ModelBrand>
            {brand} {model}
          </ModelBrand>
          <DeleteModalButton onPress={handleDeleteCar}>
            <ButtonText>Tak, usuń</ButtonText>
          </DeleteModalButton>

          <DeleteModalButton onPress={handleDeleteModalClose}>
            <ButtonText>Anuluj</ButtonText>
          </DeleteModalButton>
        </ModalInnerWrapper>
      </Modal>
    </ModalContainer>
  );
};
export default DeleteModal;
