import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { button, colors, textColors, textInput, typography } from "../styles";

export default function FormButton(props) {
  const { pressHandler, label } = props;

  return (
    <Pressable
      style={({ pressed }) => {
        let additionalStyle = pressed
          ? button.pressedButton
          : button.defaultButton;
        return [
          {
            ...styles.container,
            ...additionalStyle,
          },
        ];
      }}
      onPress={pressHandler}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...button.defaultButton,
    marginVertical: 20,
    padding: 5,
    height: 50,
    justifyContent: "center",
  },
  buttonLabel: {
    ...typography.buttonText,
    color: textColors.lightText,
    textAlign: "center",
    marginVertical: 5,
  },
});
