import { StyleSheet, View, Text } from "react-native";
import { colors, cornerRadius, textColors, typography } from "../styles";

export default function ChatMessage(props) {
  const { body, date, author, variant } = props;

  return (
    <View
      style={{
        ...styles.container,
        borderBottomLeftRadius:
          variant === "remote" ? 0 : cornerRadius.smallRadius,
        borderBottomRightRadius:
          variant === "own" ? 0 : cornerRadius.smallRadius,
        backgroundColor:
          variant === "remote" ? colors.white : colors.plum.mediumLight,
        alignSelf: variant === "remote" ? "flex-start" : "flex-end",
      }}
    >
      <Text
        style={{
          ...styles.text,
          color:
            variant === "remote" ? textColors.darkText : textColors.lightText,
        }}
      >
        {body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    borderTopLeftRadius: cornerRadius.smallRadius,
    borderTopRightRadius: cornerRadius.smallRadius,
    borderBottomLeftRadius: cornerRadius.smallRadius,
    borderBottomRightRadius: cornerRadius.smallRadius,
    marginVertical: 5,
    padding: 10,
    width: "70%",
  },
  text: {
    ...typography.bodyText,
  },
});
