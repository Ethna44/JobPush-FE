import { StyleSheet, Text, View, Button } from "react-native";

export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Candidatures</Text>
      <Button
        title="Go to StackScreen1"
        onPress={() => navigation.navigate("Accueil")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
