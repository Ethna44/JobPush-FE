import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Alert } from "react-native";


export default function ParametresCompte({ navigation }) {

     const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
     const userToken = useSelector((state) => state.user.token);
     console.log(userToken)
     const user = useSelector((state) => state.user.profile);
     console.log(user)
    //  console.log('Test: ', user.email)
 
 
 
 
 
     // Remplace ces valeurs par les vraies infos utilisateur (props, redux, etc.)
 


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
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Prenom</Text>
          <Text style={styles.value}>{user.firstName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tél.</Text>
          <Text style={styles.value}>{user.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ville</Text>
          <Text style={styles.value}>{user.address[0].city } {user.address[0].zipCode }</Text>
        </View>
         <View style={styles.row}>
          <Text style={styles.label}>Adresse</Text>
          <Text style={styles.value}>{user.address[0].streetNumber} {user.address[0].streetName}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => {/* Ajoute la logique de modification ici */}}>
        <Text style={styles.editButtonText}>Modifiez informations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete()}>
        <Text style={styles.deleteButtonText}>Supprimer compte</Text>
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
});