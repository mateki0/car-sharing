import * as React from "react";
import { Text } from "react-native";
import ButtonText from "../AccountForms/styled/ButtonText";
import Input from "../AccountForms/styled/Input";
import Label from "../AccountForms/styled/Label";
import SubmitButton from "../AccountForms/styled/SubmitButton";
import AddCarContainer from "./styled/AddCarContainer";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import ErrorText from "../AccountForms/styled/ErrorText";
import { ADD_CAR } from "../../src/utils/mutations";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";
import { Alert } from "react-native";
import AddImage from "./styled/AddImage";
import { ReactNativeFile } from "apollo-upload-client";
import * as mime from "react-native-mime-types";

import ImagePreview from "./styled/ImagePreview";
import { UserContext } from "../../src/contexts/UserContext";
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
  const currentYear = new Date().getFullYear();
  const { user } = React.useContext(UserContext);

  const [addCar] = useMutation(ADD_CAR, {
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
    const { brand, model, productionYear, engineCapacity, enginePower } = data;
    const available = true;
    const image = generateRNFile(file, `picture-${Date.now()}`);
    try {
      await addCar({
        variables: {
          brand,
          model,
          productionYear,
          engineCapacity,
          enginePower,
          available,
          image,
          owner: user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    register("brand");
    register("model");
    register("engineCapacity");
    register("enginePower");
    register("productionYear");
  }, [register]);

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
        rules={{
          required: true,
          minLength: 3,
          maxLength: 25,
        }}
      />
      {errors.brand && (
        <ErrorText>To pole jest wymagane (3-25 znaków)</ErrorText>
      )}
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
        rules={{
          required: true,
          minLength: 1,
          maxLength: 25,
        }}
      />
      {errors.model && (
        <ErrorText>To pole jest wymagane (1-25 znaków)</ErrorText>
      )}
      <Label>Pojemność silnika</Label>
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
      <Label>
        {file ? "Dodano zdjecie!" : "Dodaj zdjęcie swojego samochodu"}
      </Label>
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
