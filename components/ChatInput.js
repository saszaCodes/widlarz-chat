import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { textInput, typography } from "../styles";
import Send from "../assets/send";

export default function ChatInput(props) {
  const { handleSend } = props;
  const [message, changeMessage] = useState("");

  function sendAndClear(input) {
    handleSend(input);
    changeMessage("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onSubmitEditing={() => sendAndClear(message)}
          onChangeText={changeMessage}
          value={message}
        />
      </View>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => sendAndClear(message)}
      >
        <Send />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 5,
    paddingRight: 10,
  },
  input: {
    ...textInput.basicTextInput,
    ...typography.titleAndInput,
    height: 45,
    borderBottomRightRadius: 0,
  },
  buttonContainer: {
    flex: 1,
  },
});
