import { StyleSheet, View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";
import RoomsList from "../components/RoomsList";

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

export default function RoomsListContainer(props) {
  const { navigation } = props;

  const { loading, error, data } = useQuery(USER_ROOMS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  function handleListElementPress(id) {
    navigation.navigate("Chat", { roomId: id });
  }

  return (
    <RoomsList
      roomsList={data.usersRooms.rooms}
      pressHandler={handleListElementPress}
    />
  );
}

const styles = StyleSheet.create({});
