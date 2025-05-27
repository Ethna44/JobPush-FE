import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import  { useState } from "react";

export default function ParametresCompte({ navigation }) {
  const dispatch = useDispatch();
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const userToken = useSelector((state) => state.user.token);
  console.log(userToken);
  const user = useSelector((state) => state.user.profile);
  console.log(user);
  //  console.log('Test: ', user.email)
  const [name, setName] = useState(user.name || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user.phoneNumber ? String(user.phoneNumber) : ""
  );
  const [city, setCity] = useState(user.address[0]?.city || "");
  const [zipCode, setZipCode] = useState(user.address[0]?.zipCode || "");
  const [streetNumber, setStreetNumber] = useState(
    user.address[0]?.streetNumber ? String(user.address[0]?.streetNumber) : ""
  );
  const [streetName, setStreetName] = useState(
    user.address[0]?.streetName || ""
  );

  const handleEdit = () => {
    fetch(`${EXPO_IP}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
        name,
        firstName,
        phoneNumber,
        streetNumber,
        streetName,
        city,
        zipCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          alert(data.message || "Erreur lors de la modification");
          return;
        }
        // Met à jour le store Redux
        dispatch(
          updateUser({
            name,
            firstName,
            email,
            phoneNumber,
            address: [
              {
                streetNumber,
                streetName,
                city,
                zipCode,
              },
            ],
          })
        );
        alert("Informations mises à jour !");
      });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            fetch(`${EXPO_IP}/users/${userToken}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => response.json())
              .then((data) => {
                if (!data.result) {
                  alert(data.error || "Erreur lors de la suppression");
                  return;
                }

                navigation.navigate("Accueil");
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres compte</Text>
      <View style={styles.separator} />

      <View style={styles.infoTable}>
        <View style={styles.row}>
          <Text style={styles.label}>Nom</Text>
          <TextInput style={styles.value} value={name} onChangeText={setName} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Prenom</Text>
          <TextInput
            style={styles.value}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.value} value={email} editable={false} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tél.</Text>
          <TextInput
            style={styles.value}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ville</Text>
          <TextInput style={styles.value} value={city} onChangeText={setCity} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Code Postal</Text>
          <TextInput
            style={styles.value}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.value}
            value={streetNumber}
            onChangeText={setStreetNumber}
            keyboardType="numeric"
            placeholder="N°"
          />
          <TextInput
            style={styles.value}
            value={streetName}
            onChangeText={setStreetName}
            placeholder="Rue"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Modifiez informations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete()}
      >
        <Text style={styles.deleteButtonText}>Supprimer compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ApplyButton}
        onPress={() => {
          navigation.navigate("Compte");
        }}
      >
        <FontAwesome name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "#BDBDBD",
    marginVertical: 10,
  },
  infoTable: {
    width: "90%",
    marginBottom: 140,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#495057",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 2,
    borderRadius: 2,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    width: "35%",
  },
  value: {
    color: "#fff",
    width: "60%",
    textAlign: "right",
  },
  editButton: {
    backgroundColor: "#1CCFC1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#C94A5F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  ApplyButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F72C03",
    borderRadius: 18,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 7,
    marginTop: 4,
    borderColor: "blue",
    borderWidth: 1,
    maxWidth: " 35%",
  },
});
