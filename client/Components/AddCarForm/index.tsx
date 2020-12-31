import * as React from "react";
import ButtonText from "../AccountForms/styled/ButtonText";
import Input from "../AccountForms/styled/Input";
import Label from "../AccountForms/styled/Label";
import SubmitButton from "../AccountForms/styled/SubmitButton";
import AddCarContainer from "./styled/AddCarContainer";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
const ADD_CAR = gql`
  mutation ADD_CAR(
    $brand: String!
    $model: String!
    $productionYear: String!
    $engineCapacity: String!
    $enginePower: String!
    $available: Boolean!
  ) {
    addCar(
      brand: $brand
      model: $model
      productionYear: $productionYear
      engineCapacity: $engineCapacity
      enginePower: $enginePower
      available: $available
    ) {
      brand
      model
      engineCapacity
      enginePower
      productionYear
      available
    }
  }
`;
interface CarProps {
  brand: string;
  model: string;
  engineCapacity: string;
  enginePower: string;
  productionYear: string;
}
const AddCarForm = () => {
  const navigation = useNavigation();
  const { control, errors, register, handleSubmit } = useForm<CarProps>();
  const [addCar] = useMutation(ADD_CAR, {
    onCompleted: () => navigation.navigate("AccountScreen"),
  });
  const handleAdd = (data: CarProps) => {
    const { brand, model, productionYear, engineCapacity, enginePower } = data;
    const available = true;
    addCar({
      variables: {
        brand,
        model,
        productionYear,
        engineCapacity,
        enginePower,
        available,
      },
    });
  };
  React.useEffect(() => {
    register("brand");
    register("model");
    register("engineCapacity");
    register("enginePower");
    register("productionYear");
  }, [register]);
  return (
    <AddCarContainer>
      <Label>Marka</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Marka"
            onBlur={onBlur}
          />
        )}
        name="brand"
        defaultValue=""
      />
      <Label>Model</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Model"
            onBlur={onBlur}
          />
        )}
        name="model"
        defaultValue=""
      />
      <Label>Pojemność silnika</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Pojemność silnika"
            onBlur={onBlur}
          />
        )}
        name="engineCapacity"
        defaultValue=""
      />
      <Label>Moc(km)</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Moc"
            onBlur={onBlur}
            keyboardType="numeric"
          />
        )}
        name="enginePower"
        defaultValue=""
      />
      <Label>Rocznik samochodu</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Rok produkcji"
            onBlur={onBlur}
            keyboardType="numeric"
          />
        )}
        name="productionYear"
        defaultValue=""
      />
      <SubmitButton onPress={handleSubmit(handleAdd)}>
        <ButtonText>Dodaj</ButtonText>
      </SubmitButton>
    </AddCarContainer>
  );
};
export default AddCarForm;
