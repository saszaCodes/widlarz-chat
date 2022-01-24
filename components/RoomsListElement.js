import { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { colors, cornerRadius, typography, textColors } from "../styles";
import Profile from "../assets/profile";
import { white } from "../styles/colors";

export default function RoomsListElement(props) {
  const { name, id, pressHandler } = props;
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: isPressed ? colors.plum.mediumDark : colors.white },
      ]}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
        pressHandler(id);
      }}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Profile />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                {
                  color: isPressed ? textColors.lightText : textColors.darkText,
                },
              ]}
            >
              {name}
            </Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text
              style={[
                styles.subtitle,
                {
                  color: isPressed ? textColors.lightText : textColors.darkText,
                },
              ]}
            >
              Tap here to open the chat.
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    backgroundColor: colors.white,
    borderRadius: cornerRadius.smallRadius,
    marginVertical: 5,
    padding: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    margin: 5,
    flex: 1,
  },
  textContainer: {
    margin: 5,
    flex: 4,
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    ...typography.buttonText,
    marginVertical: 3,
    flex: 1,
    flexWrap: "wrap",
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  subtitle: {
    ...typography.specialText,
    marginVertical: 3,
    flex: 1,
    flexWrap: "wrap",
  },
});
