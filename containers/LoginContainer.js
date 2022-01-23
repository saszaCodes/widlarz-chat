import { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useMutation, gql } from "@apollo/client";
import SessionContext from "../contexts/SessionContext";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export default function LoginContainer(props) {
  const { navigation } = props;
  const { setSessionToken } = useContext(SessionContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      email: undefined,
      password: undefined,
    },
  });

  if (data) {
    setSessionToken(data.loginUser.token);
    navigation.replace("RoomsList");
  }

  function handleLogin(email, password) {
    login({
      variables: { email, password },
    }).catch(() => {
      setEmail("");
      setPassword("");
    });
  }

  function handleRegistrationRoute() {
    navigation.replace("Registration");
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      {error && <Text>{error.message}</Text>}
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <Pressable onPress={() => handleLogin(email, password)}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={handleRegistrationRoute}>
        <Text>Register, if you don't have an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
