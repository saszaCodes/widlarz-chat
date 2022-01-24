import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useMutation, gql } from "@apollo/client";
import * as Linking from "expo-linking";
import HeaderBar from "../components/HeaderBar";
import HeaderTitle from "../components/HeaderTitle";
import Form from "../components/Form";
import { colors, typography } from "../styles";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormText from "../components/FormText";

const REGISTER = gql`
  mutation register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    registerUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      id
    }
  }
`;

export default function RegistrationContainer(props) {
  const { navigation } = props;
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const [login, { data, loading, error }] = useMutation(REGISTER, {
    variables: {
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    },
  });

  if (data) {
    navigation.replace("Login");
  }

  function handleRegistration(
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation
  ) {
    login({
      variables: { email, firstName, lastName, password, passwordConfirmation },
    }).catch(() => {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setPasswordConfirmation("");
    });
  }

  function handleLoginRoute() {
    navigation.replace("Login");
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <React.Fragment>
      <HeaderBar notRounded={true}>
        <HeaderTitle title={"Create account"} />
      </HeaderBar>
      <Form>
        {error && <Text>{error.message}</Text>}
        <FormInput
          onChangeText={setEmail}
          value={email}
          label="e-mail address"
        />
        <FormInput
          onChangeText={setFirstName}
          value={firstName}
          label="first name"
        />
        <FormInput
          onChangeText={setLastName}
          value={lastName}
          label="last name"
        />
        <FormInput
          onChangeText={setPassword}
          value={password}
          label="password"
          secureTextEntry={true}
        />
        <FormInput
          onChangeText={setPasswordConfirmation}
          value={passwordConfirmation}
          label="password confirmation"
          secureTextEntry={true}
        />
        <FormButton
          pressHandler={() =>
            handleRegistration(
              email,
              firstName,
              lastName,
              password,
              passwordConfirmation
            )
          }
          label={"Sign up"}
        />
        <FormText style={{ ...typography.bodyText }}>
          By signing in you agree with{"\n"}
          <Text
            onPress={() => Linking.openURL("https://github.com/saszaCodes")}
            style={{
              textDecorationLine: "underline",
              color: colors.blue.dark,
            }}
          >
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text
            onPress={() => Linking.openURL("https://github.com/saszaCodes")}
            style={{
              textDecorationLine: "underline",
              color: colors.blue.dark,
            }}
          >
            Privacy Policy
          </Text>
        </FormText>
        <FormText style={{ ...typography.bodyText }}>
          Already have an account?{" "}
          <Text
            onPress={handleLoginRoute}
            style={{
              fontWeight: "bold",
              color: colors.plum.dark,
            }}
          >
            Log in
          </Text>
        </FormText>
      </Form>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
