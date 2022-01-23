import { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useMutation, gql } from "@apollo/client";

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
    <View>
      {error && <Text>{error.message}</Text>}
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First name"
      />
      <TextInput
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last name"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <TextInput
        onChangeText={setPasswordConfirmation}
        value={passwordConfirmation}
        placeholder="Password confirmation"
      />
      <Pressable
        onPress={() =>
          handleRegistration(
            email,
            firstName,
            lastName,
            password,
            passwordConfirmation
          )
        }
      >
        <Text>Register</Text>
      </Pressable>
      <Pressable onPress={handleLoginRoute}>
        <Text>Login, if you have an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
