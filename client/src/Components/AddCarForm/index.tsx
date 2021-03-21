import * as React from "react";
import { ActivityIndicator, Text } from "react-native";
import ButtonText from "../AccountForms/styled/ButtonText";
import Input from "../AccountForms/styled/Input";
import SubmitButton from "../AccountForms/styled/SubmitButton";
import AddCarContainer from "./styled/AddCarContainer";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import ErrorText from "../AccountForms/styled/ErrorText";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";
import { Alert } from "react-native";
import AddImage from "./styled/AddImage";
import { ReactNativeFile } from "apollo-upload-client";
import * as mime from "react-native-mime-types";

import ImagePreview from "./styled/ImagePreview";
import { UserContext } from "../../contexts/UserContext";
import ADD_CAR from "../../utils/apollo/mutations/addCar";
import AddCarText from "./styled/AddCarText";

interface CarProps {
  brand: string;
  model: string;
  engineCapacity: string;
  description:string;
  enginePower: string;
  productionYear: string;
}

const AddCarForm = () => {
  const navigation = useNavigation();
  const { control, errors, handleSubmit } = useForm<CarProps>();
  const currentYear = new Date().getFullYear();
  const { user } = React.useContext(UserContext);

  const [addCar, {loading}] = useMutation(ADD_CAR, {
    onCompleted: () => navigation.navigate("AccountScreen"),
  });

  const [file, setFile] = React.useState("");
  const generateRNFile = (uri: string, name: string) => {
    return uri
      ? new ReactNativeFile({
          uri,
          type: mime.lookup(uri) || "image",
          name,
        })
      : null;
  };

  const handleAdd = async (data: CarProps) => {
    const { brand, model, productionYear, description, engineCapacity, enginePower } = data;
    const available = true;
    const image = generateRNFile(file, `picture-${Date.now()}`);
    try {
      await addCar({
        variables: {
          brand,
          model,
          productionYear,
          description,
          engineCapacity,
          enginePower,
          available,
          image,
          owner: user["id"],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const askForPermission = async () => {
    const permissionResult = await Permission.askAsync(Permission.CAMERA);
    if (permissionResult.status !== "granted") {
      Alert.alert("Brak pozwolenia na dostęp do kamery i galerii", [
        { text: "Ok" },
      ] as any);
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      return;
    } else {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.3,
      });

      if (!image.cancelled) {
        setFile(image.uri);
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff"/>;
  
  return (
    <AddCarContainer>
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
        rules={{
          required: true,
          minLength: 3,
          maxLength: 25,
        }}
      />
      {errors.brand && (
        <ErrorText>To pole jest wymagane (3-25 znaków)</ErrorText>
      )}

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
        rules={{
          required: true,
          minLength: 1,
          maxLength: 25,
        }}
      />
      {errors.model && (
        <ErrorText>To pole jest wymagane (1-25 znaków)</ErrorText>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Opis"
            onBlur={onBlur}
          />
        )}
        name="description"
        defaultValue=""
        rules={{
          required: true,
          minLength: 8,
          maxLength: 150,
        }}
      />
      {errors.description && (
        <ErrorText>To pole jest wymagane (8-150 znaków)</ErrorText>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Pojemność silnika"
            onBlur={onBlur}
            keyboardType="numeric"
          />
        )}
        name="engineCapacity"
        rules={{
          pattern: {
            value: /\d{1,5}/,
            message: "Niepoprawna wartość (1-5 cyfr)",
          },
        }}
        defaultValue=""
      />
      {errors.engineCapacity && (
        <ErrorText>{errors.engineCapacity.message}</ErrorText>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Moc(km)"
            onBlur={onBlur}
            keyboardType="numeric"
          />
        )}
        name="enginePower"
        rules={{
          pattern: {
            value: /\d{1,4}/,
            message: "Niepoprawna wartość (1-4 cyfry)",
          },
        }}
        defaultValue=""
      />
      {errors.enginePower && (
        <ErrorText>{errors.enginePower.message}</ErrorText>
      )}

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
        rules={{
          min: currentYear - 50,
          max: currentYear,
          pattern: {
            value: /\d{1,4}/,
            message: "Niepoprawna wartość (1-4 cyfry)",
          },
        }}
      />
      {errors.productionYear && (
        <ErrorText>{errors.productionYear.message}</ErrorText>
      )}
      <AddCarText>
        {file ? "Dodano zdjecie!" : "Dodaj zdjęcie swojego samochodu"}
      </AddCarText>
      <AddImage onPress={takeImage}>
        <ButtonText>{file ? "Zmień zdjęcie" : "Dodaj zdjęcie"}</ButtonText>
      </AddImage>
      {file ? <ImagePreview source={{ uri: file }} /> : <Text></Text>}
      <SubmitButton onPress={handleSubmit(handleAdd)}>
        <ButtonText>Dodaj samochód</ButtonText>
      </SubmitButton>
    </AddCarContainer>
  );
};
export default AddCarForm;
