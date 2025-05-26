import { StyleSheet, Text, View, Button } from "react-native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";

export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Astuces</Text>
      <Articles />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F1F1",
  },
  title: AppStyles.title,
});
