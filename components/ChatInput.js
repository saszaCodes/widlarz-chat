import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default function ChatInput(props) {
  const { handleSend } = props;
  const [message, changeMessage] = useState("");

  function sendAndClear(input) {
    handleSend(input);
    changeMessage("");
  }

  return (
    <TextInput
      onSubmitEditing={() => sendAndClear(message)}
      onChangeText={changeMessage}
      value={message}
      placeholder="Your message..."
    />
  );
}

const styles = StyleSheet.create({});
