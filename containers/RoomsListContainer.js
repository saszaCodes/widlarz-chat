import { StyleSheet, View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";

const USER_ROOMS = gql`
  query getRoom {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

export default function RoomsListContainer() {
  const { loading, error, data } = useQuery(USER_ROOMS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  const rooms = data.usersRooms.rooms.map((el) => <Text>{el.name}</Text>);

  return <View>{rooms}</View>;
}

const styles = StyleSheet.create({});
