import { StyleSheet, View, Text, TextInput } from "react-native";
import { colors, textColors, textInput, typography } from "../styles";

export default function FormDescription(props) {
  const { style, children } = props;
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    ...typography.heading2,
    color: textColors.lightText,
    paddingTop: 10,
    paddingBottom: 20,
  },
});
