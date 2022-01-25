import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useMutation, gql } from "@apollo/client";
import SessionContext from "../contexts/SessionContext";
import Form from "../components/Form";
import HeaderBar from "../components/HeaderBar";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormText from "../components/FormText";
import HeaderTitle from "../components/HeaderTitle";
import { colors, typography } from "../styles";
import FormDescription from "../components/FormDescription";

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
  const { setSessionToken, setLoggedUserId } = useContext(SessionContext);
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
    setLoggedUserId(data.loginUser.user.id);
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
    <React.Fragment>
      <HeaderBar notRounded={true}>
        <HeaderTitle title={"Welcome back"} />
      </HeaderBar>
      <Form>
        {error && <Text>{error.message}</Text>}
        <FormDescription>
          Log in and stay in touch with everyone!
        </FormDescription>
        <FormInput
          onChangeText={setEmail}
          value={email}
          label={"e-mail address"}
        />
        <FormInput
          onChangeText={setPassword}
          value={password}
          label="password"
          secureTextEntry={true}
        />
        <FormButton
          label={"Login"}
          pressHandler={() => handleLogin(email, password)}
        />
        <FormText style={{ ...typography.bodyText }}>
          Don't have an account?{" "}
          <Text
            onPress={handleRegistrationRoute}
            style={{
              fontWeight: "bold",
              color: colors.plum.dark,
            }}
          >
            Register
          </Text>
        </FormText>
      </Form>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
