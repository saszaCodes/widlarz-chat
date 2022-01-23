import { StyleSheet } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomsListScreen from "./screens/RoomsListScreen";
import ChatScreen from "./screens/ChatScreen";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = "YOUR_TOKEN";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RoomsList" component={RoomsListScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({});
