import * as React from "react";
import ButtonText from "./styled/ButtonText";
import FormContainer from "./styled/FormContainer";
import Input from "./styled/Input";
import Label from "./styled/Label";
import SubmitButton from "./styled/SubmitButton";
import { useForm, Controller } from "react-hook-form";
import ErrorText from "./styled/ErrorText";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { INSERT_USER, LOGIN_USER } from "../../src/utils/mutations";
interface UseFormProps {
  email: string;
  password: string;
}

const AccountForms = ({ isLogin }: { isLogin?: boolean }) => {
  const [insertUser] = useMutation(INSERT_USER, {
    onCompleted: () => navigation.navigate("Login"),
  });
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      setToken(login.user.id);
      navigation.navigate("Home");
    },
  });
  const [editable, setEditable] = React.useState(false);
  const { control, errors, register, handleSubmit } = useForm<UseFormProps>();
  const navigation = useNavigation();
  React.useEffect(() => {
    setTimeout(() => {
      setEditable(true);
    }, 100);
  }, []);

  React.useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const setToken = React.useCallback(async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleLogin = (data: { email: string; password: string }) => {
    const { email, password } = data;
    loginUser({
      variables: { email, password },
    });
  };
  const handleCreate = (data: { email: string; password: string }) => {
    const { email, password } = data;
    insertUser({
      variables: { email, password },
    });
  };
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    <FormContainer>
      <Label>Email</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            editable={editable}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Email"
            onBlur={onBlur}
          />
        )}
        name="email"
        rules={{
          pattern: { value: EMAIL_REGEX, message: "Email jest nieprawidłowy" },
        }}
        defaultValue=""
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Label>Hasło</Label>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Hasło"
            secureTextEntry={true}
            onBlur={onBlur}
          />
        )}
        name="password"
        rules={{ required: true, minLength: 8 }}
        defaultValue=""
      />
      {errors.password && (
        <ErrorText>Hasło jest nieprawidłowe(min. 8 znaków)</ErrorText>
      )}
      <SubmitButton
        accessibilityLabel="Create account form submit"
        onPress={
          isLogin ? handleSubmit(handleLogin) : handleSubmit(handleCreate)
        }
      >
        <ButtonText>{isLogin ? "Zaloguj się" : "Załóż konto"}</ButtonText>
      </SubmitButton>
    </FormContainer>
  );
};
export default AccountForms;
