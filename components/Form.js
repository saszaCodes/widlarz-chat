import { StyleSheet, View, Text, ScrollView } from "react-native";
import { colors, textColors, typography } from "../styles";

export default function Form(props) {
  const { children } = props;
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue.medium,
    flex: 1,
    paddingHorizontal: 20,
  },
});
