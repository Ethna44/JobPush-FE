import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PreferencesCard(props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity>
        <FontAwesome
          name="close"
          size={25}
          color={AppStyles.color.text}
          style={{ position: "absolute",right: 0 }}
        />
      </TouchableOpacity>  
      <View style={styles.textContainer}>
        <Text style={styles.text}>Titre du poste</Text>
        <Text style={styles.text}>Secteur</Text>
        <Text style={styles.text}>Type de contrat</Text>
        <Text style={styles.text}>Ville</Text>
        <Text style={styles.text}>Région</Text>
        <Text style={styles.text}>Télétravail</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    width: 350,
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
    marginBottom: 20,
  },
  textContainer : {
    maxWidth: 300,
    borderColor : 'purple',
    borderWidth: 1,
  },
  text : AppStyles.body,


});
