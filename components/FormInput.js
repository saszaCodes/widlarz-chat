import { StyleSheet, View, Text, TextInput } from "react-native";
import { colors, textColors, textInput, typography } from "../styles";

export default function FormInput(props) {
  const { onChangeText, value, secureTextEntry, label } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  label: {
    ...typography.label,
    color: textColors.lightText,
    paddingVertical: 1,
  },
  input: {
    ...textInput.basicTextInput,
    ...typography.titleAndInput,
    height: 45,
  },
});
