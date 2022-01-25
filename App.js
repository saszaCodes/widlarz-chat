import { StyleSheet } from "react-native";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import {
  split,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import SessionContext from "./contexts/SessionContext";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import RoomsListScreen from "./screens/RoomsListScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

function createApolloClient(token, type) {
  const httpLink = createHttpLink({
    uri: "https://chat.thewidlarzgroup.com/api/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  let phoenixSocket, absintheSocket, wsLink, splitLink;

  if (type === "withSubscription") {
    phoenixSocket = new PhoenixSocket("wss://chat.thewidlarzgroup.com/socket", {
      params: {
        token,
      },
    });
    absintheSocket = AbsintheSocket.create(phoenixSocket);
    wsLink = createAbsintheSocketLink(absintheSocket);
    splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );
  }

  const client = new ApolloClient({
    link: authLink.concat(splitLink || httpLink),
    cache: new InMemoryCache(),
  });

  return client;
}

export default function App() {
  const [sessionToken, setSessionToken] = useState();
  const [loggedUserId, setLoggedUserId] = useState();
  const [apolloClient, setApolloClient] = useState(createApolloClient());
  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins/Poppins-Black.ttf"),
  });
  contextValue = {
    sessionToken,
    loggedUserId,
    setSessionToken,
    setLoggedUserId,
  };

  useEffect(() => {
    const newAutorizedClient = createApolloClient(
      sessionToken,
      "withSubsription"
    );
    setApolloClient(newAutorizedClient);
  }, [sessionToken]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SessionContext.Provider value={contextValue}>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RoomsList" component={RoomsListScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </SessionContext.Provider>
  );
}
