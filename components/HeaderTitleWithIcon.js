import { StyleSheet, View, Text } from "react-native";
import { colors, textColors, typography } from "../styles";
import Profile from "../assets/profile";

export default function HeaderTitleWithIcon(props) {
  const { icon, title, subtitle } = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.subtitleContainer} numberOfLines={1}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 3,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    ...typography.titleAndInput,
    color: textColors.plumText,
    flex: 1,
    flexWrap: "wrap",
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  subtitle: {
    ...typography.titleAndInput,
    color: textColors.lightText,
    flex: 1,
    flexWrap: "wrap",
  },
});
