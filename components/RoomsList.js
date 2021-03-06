import { StyleSheet, View, Text, ScrollView } from "react-native";
import { colors } from "../styles";
import RoomsListElement from "./RoomsListElement";

export default function RoomsList(props) {
  const { roomsList, pressHandler } = props;

  const roomsListElements = roomsList.map((room) => (
    <RoomsListElement
      key={room.id}
      id={room.id}
      name={room.name}
      pressHandler={pressHandler}
    />
  ));

  return <ScrollView style={styles.container}>{roomsListElements}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: colors.blue.light,
  },
});
