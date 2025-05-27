import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";
import PreferencesCard from "../components/PreferencesCard";

export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Compte</Text>
      <View style={styles.separator} />
      <Text style={AppStyles.subtitle}>Mes Préférences</Text>
      <PreferencesCard/>
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
    marginBottom: 10,
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
    marginLeft: 20,
    marginBottom: 50,
    marginTop: 20,
  },
  addSearch: {
    fontSize: 20,
    color: AppStyles.color.text,
  },
  plusButton: {
    marginLeft: 10,
    backgroundColor: AppStyles.color.accent,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: AppStyles.color.background,
    fontSize: 35,
    fontWeight: "bold",
    lineHeight: 24,
  },
  button: { ...AppStyles.button, marginBottom: 20, width: "60%", height: 50 },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
