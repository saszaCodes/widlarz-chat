import { colors, cornerRadius } from "../styles";
import { StyleSheet, View, Text } from "react-native";
import HeaderButton from "./HeaderButton";

export default function Footer(props) {
  const { children } = props;
  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.blue.light,
    paddingTop: 10,
  },
  container: {
    backgroundColor: colors.blue.medium,
    height: 90,
    padding: 15,
    paddingBottom: 25,
    borderTopLeftRadius: cornerRadius.bigRadius,
    borderTopRightRadius: cornerRadius.bigRadius,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flex: 2,
  },
  headerButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
