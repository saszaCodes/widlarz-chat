import { colors, cornerRadius } from "../styles";
import { StyleSheet, View, Text } from "react-native";

export default function HeaderBar(props) {
  console.log(colors.blue.medium);
  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <View style={styles.headerContent}></View>
        <View style={styles.headerButtons}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.blue.light,
  },
  container: {
    backgroundColor: colors.blue.medium,
    height: 90,
    borderBottomLeftRadius: cornerRadius.bigRadius,
    borderBottomRightRadius: cornerRadius.bigRadius,
  },
  headerContent: {},
  headerButtons: {},
});
