import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import AppStyles from "../AppStyles";
import PreferencesCard from "../components/PreferencesCard";

export default function TabScreen1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mon compte</Text>
      {/* <View style={styles.separator} /> */}
      {/* <Text style={AppStyles.subtitle}>Mes Préférences</Text> */}
      <View style={styles.preferencesContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <PreferencesCard/>
        </ScrollView>
      </View>
         {/* <View style={styles.separator} /> */}
      <View style={styles.addSearchRow}>
        <Text style={styles.body}>Ajoutez nouvelle recherche</Text>
        <TouchableOpacity 
        style={styles.plusButton} 
        onPress={() => navigation.navigate("Recherche")}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alerte", { origin: "account" })}
      >
        <Text style={styles.buttonText}>ALERTES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ParametresCompte");
        }}
      >
        <Text style={styles.buttonText}>PARAMETRES DU COMPTE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    alignItems : 'center',
    // borderColor: "red",
    // borderWidth: 1,
  },
  title: {
    ...AppStyles.title,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  preferencesContainer: {
    width: "100%",
    height: '50%',
    alignItems : 'center',
    paddingTop: 8,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  scrollView: {
    justifyContent : 'center',
    alignItems : 'center',
    // borderColor: "green",
    // borderWidth: 1,
  },
  // separator: {
  //   width: "90%",
  //   height: 1,
  //   backgroundColor: "#BDBDBD",
  //   marginVertical: 10,
  // },
  addSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  body: AppStyles.body,
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
  button: { ...AppStyles.button, marginBottom: 20, width: 250},
  buttonText: AppStyles.buttonText,
});
