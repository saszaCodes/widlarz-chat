import { StyleSheet, View, Text, Pressable } from "react-native";
import { button, textColors, typography } from "../styles";

export default function HeaderButton(props) {
  const { icon } = props;
  return <Pressable>{icon}</Pressable>;
}
