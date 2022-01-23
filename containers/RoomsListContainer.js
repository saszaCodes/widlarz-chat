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

export default function RoomsListContainer() {
  const { loading, error, data } = useQuery(USER_ROOMS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  const rooms = data.usersRooms.rooms.map((el) => <Text>{el.name}</Text>);

  function handleListElementPress(id) {
    console.log(id);
  }

  return (
    <RoomsList
      roomsList={data.usersRooms.rooms}
      pressHandler={handleListElementPress}
    />
  );
}

const styles = StyleSheet.create({});
