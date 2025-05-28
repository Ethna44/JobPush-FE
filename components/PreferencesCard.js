import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { use } from "react";
import { removePreference } from "../reducers/user";

export default function PreferencesCard(props) {
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { jobTitle, sector, contractType, cityJob, region, remote, _id } =
    props;
  const handleDeletePreference = async () => {
    const response = await fetch(`${EXPO_IP}/users/preference/remove`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        _id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.result) {
        dispatch(removePreference(_id));

        //console.log("Préférence mise à jour avec succès");
      } else {
        console.error("Erreur lors de la mise à jour des préférences");
      }
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleDeletePreference()}>
        <FontAwesome
          name="close"
          size={25}
          color={AppStyles.color.text}
          style={{ position: "absolute", right: 0 }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{jobTitle || "Poste"}</Text>
        <Text style={styles.text}>{sector || "Secteur"}</Text>
        <Text style={styles.text}>{contractType || "Type de contrat"}</Text>
        <Text style={styles.text}>{cityJob || "Ville"}</Text>
        <Text style={styles.text}>{region || "Région"}</Text>
        <Text style={styles.text}>{remote || "Télétravail"}</Text>
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
  textContainer: {
    maxWidth: 300,
    borderColor: "purple",
    borderWidth: 1,
  },
  text: AppStyles.body,
});
