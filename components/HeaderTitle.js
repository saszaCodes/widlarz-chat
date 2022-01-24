import { StyleSheet, View, Text } from "react-native";
import { textColors, typography } from "../styles";

export default function HeaderTitle(props) {
  const { title } = props;
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    color: textColors.plumText,
  },
});
