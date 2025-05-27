import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PreferencesCard(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome
          name="close"
          size={25}
          color={AppStyles.color.text}
          style={{ position: "absolute",right: 0 }}
        />
      </TouchableOpacity>  
      <View>
        <Text style={AppStyles.text}>Titre du poste</Text>
        <Text style={AppStyles.text}>Secteur</Text>
        <Text style={AppStyles.text}>Type de contrat</Text>
        <Text style={AppStyles.text}>Ville</Text>
        <Text style={AppStyles.text}>Région</Text>
        <Text style={AppStyles.text}>Télétravail</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "90%",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: AppStyles.color.cards,
    padding: 10,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
});
