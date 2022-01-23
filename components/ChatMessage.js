import { StyleSheet, View, Text } from "react-native";

export default function ChatMessagesAll(props) {
  const { body, date, author } = props;

  return (
    <Text>
      {author}
      {"\n"}
      {date}
      {"\n"}
      {body}
    </Text>
  );
}

const styles = StyleSheet.create({});
