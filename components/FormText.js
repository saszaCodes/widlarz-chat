import { StyleSheet, View, Text, TextInput } from "react-native";
import { colors, textColors, textInput, typography } from "../styles";

export default function FormText(props) {
  const { style, children } = props;
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: textColors.lightText,
    marginVertical: 5,
  },
});
