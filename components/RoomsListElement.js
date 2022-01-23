import { StyleSheet, View, Text, Pressable } from "react-native";

export default function RoomsListElement(props) {
  const { name, id, pressHandler } = props;

  return (
    <Pressable onPress={() => pressHandler(id)}>
      <Text>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
