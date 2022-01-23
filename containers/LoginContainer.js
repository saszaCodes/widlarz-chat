import { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useMutation, gql } from "@apollo/client";
import SessionContext from "../contexts/SessionContext";
import RoomsList from "../components/RoomsList";

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

export default function RoomsListContainer(props) {
  const { navigation } = props;
  const { setSessionToken } = useContext(SessionContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalidCredentials, setInvalidCredentials] = useState(false);

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
    setInvalidCredentials(false);
    login({
      variables: { email, password },
    }).catch((err) => {
      if (err.message === "Invalid credentials") {
        setEmail("");
        setPassword("");
        setInvalidCredentials(true);
      }
    });
  }

  if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>{error.message}</Text>;

  return (
    <View>
      {invalidCredentials && <Text>Invalid credentials!</Text>}
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <Pressable onPress={() => handleLogin(email, password)}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
