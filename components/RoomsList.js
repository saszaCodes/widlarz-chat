import { StyleSheet, View, Text } from "react-native";
import RoomsListElement from "./RoomsListElement";

export default function RoomsList(props) {
  const { roomsList, pressHandler } = props;

  const roomsListElements = roomsList.map((room) => (
    <RoomsListElement
      name={room.name}
      id={room.id}
      pressHandler={pressHandler}
    />
  ));

  return <View>{roomsListElements}</View>;
}

const styles = StyleSheet.create({});
