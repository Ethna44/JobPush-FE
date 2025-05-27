import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";

export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Compte</Text>
      <View style={styles.separator} />
      <View style={styles.addSearchRow}>
        <Text style={styles.addSearch}>Ajoutez nouvelle recherche</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate("Recherche")}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ParametresCompte");
        }}
      >
        <Text style={styles.buttonText}>Paramètres compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alerte", { origin: "account" })}
      >
        <Text style={styles.buttonText}>Alertes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F1F1",
    paddingTop: 15,
  },
  title: {
    ...AppStyles.title,
    marginTop: 1,
    marginBottom: 30,
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "#BDBDBD",
    marginVertical: 10,
  },
  addSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginBottom: 280,
    marginTop: 10,
  },
  addSearch: {
    fontSize: 16,
    color: "#333",
  },
  plusButton: {
    marginLeft: 10,
    backgroundColor: "#1CCFC1",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#1CCFC1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: "55%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
