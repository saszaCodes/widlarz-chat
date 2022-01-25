import { colors, cornerRadius } from "../styles";
import { StyleSheet, View, Text } from "react-native";
import HeaderButton from "./HeaderButton";

export default function HeaderBar(props) {
  const { children, button1, button2, notRounded } = props;
  return (
    <View style={styles.backdrop}>
      <View
        style={
          notRounded
            ? {
                ...styles.container,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : styles.container
        }
      >
        <View style={styles.headerContent}>{children}</View>
        <View style={styles.headerButtons}>
          <HeaderButton icon={button1} />
          <HeaderButton icon={button2} />
        </View>
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
    padding: 15,
    paddingTop: 25,
    borderBottomLeftRadius: cornerRadius.bigRadius,
    borderBottomRightRadius: cornerRadius.bigRadius,
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
