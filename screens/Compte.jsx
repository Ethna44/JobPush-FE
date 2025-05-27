import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";

export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Compte</Text>
      <View style={styles.separator} />
      <Text style={styles.addSearch}>+ Ajoutez nouvelle recherche</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // À remplacer plus tard par la navigation vers le composant paramètres
          navigation.navigate("ParametresCompte"); // ou ouvrir un composant modal
        }}
      >
        <Text style={styles.buttonText}>Paramètres compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alerte")}
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
  addSearch: {
    fontSize: 16,
    color: "#333",
    marginBottom: 280,
    marginTop:10,
    alignSelf: "flex-start",
    marginLeft: 25,
  },
  button: {
    backgroundColor: "#1CCFC1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: "55%",
    alignItems: "center",
    marginBottom : 10,
    marginTop : 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});