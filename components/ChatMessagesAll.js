import { StyleSheet, View, Text } from "react-native";
import ChatMessage from "./ChatMessage";

export default function ChatMessagesAll(props) {
  const { messagesList } = props;

  const messagesListElements = messagesList.map((message) => (
    <ChatMessage
      body={message.body}
      date={message.date}
      author={message.author}
    />
  ));

  return <View>{messagesListElements}</View>;
}

const styles = StyleSheet.create({});
