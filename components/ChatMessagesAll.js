import { useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import SessionContext from "../contexts/SessionContext";
import { colors } from "../styles";
import ChatMessage from "./ChatMessage";

export default function ChatMessagesAll(props) {
  const { messagesList } = props;
  const { loggedUserId } = useContext(SessionContext);

  const messagesListElements = messagesList
    .map((message) => (
      <ChatMessage
        key={message.id}
        body={message.body}
        date={message.date}
        author={message.author}
        variant={loggedUserId === message.authorId ? "own" : "remote"}
      />
    ))
    .reverse();

  return (
    <ScrollView style={styles.container}>{messagesListElements}</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 15,
    backgroundColor: colors.blue.light,
  },
});
