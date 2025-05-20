import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import React from "react";

export default function Profil({ navigation }) {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phonenumber, setPhoneNumber] = useState(0);
  const [streetNumber, setStreetNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(0);
  const [contratType, setContratType] = useState("");
  const [remote, setRemote] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [sector, setSector] = useState("");
  const [cityJob, setCityJob] = useState("");
  const [region, setRegion] = useState("");

  const handleSummit = () => {
    fetch("http:///192.168.100.250:3000/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        firstName: firstName,
        phoneNumber: phonenumber,
        streetNumber: streetNumber,
        address: address,
        city: city,
        zipCode: zipCode,
        contratType:contratType,
        remote:remote,
        jobTitle:jobTitle,
        sector:sector,
        city:cityJob,
        region:region,
      }),
    }).then(response => response.json()).then(data => {
      if(data.result){
        navigation.navigate("Alerte")
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      <Text style={styles.subtitle}>Civilité</Text>
      <TextInput placeholder="Nom" onChangeText={(value) => setName(value)} />
      <TextInput
        placeholder="Prenom"
        onChangeText={(value) => setFirstName(value)}
      />
      <TextInput
        placeholder="Numéro de téléphone"
        onChangeText={(value) => setPhoneNumber(value)}
      />
      <TextInput
        placeholder="Numéro de rue"
        onChangeText={(value) => setStreetNumber(value)}
      />
      <TextInput
        placeholder="Nom de rue"
        onChangeText={(value) => setAddress(value)}
      />
      <TextInput placeholder="Ville" onChangeText={(value) => setCity(value)} />
      <TextInput
        placeholder="Code Postal"
        onChangeText={(value) => setZipCode(value)}
      />
      <Text style={styles.subtitle}>Mes préférences</Text>
      <TextInput
        placeholder="Contrat"
        onChangeText={(value) => setContratType(value)}
      />
      <TextInput
        placeholder="Ville"
        onChangeText={(value) => setCityJob(value)}
      />
      <TextInput
        placeholder="Region"
        onChangeText={(value) => setRegion(value)}
      />
      <TextInput
        placeholder="Télétravail"
        onChangeText={(value) => setRemote(value)}
      />
      <TextInput
        placeholder="Poste"
        onChangeText={(value) => setJobTitle(value)}
      />
      <TextInput
        placeholder="Secteur"
        onChangeText={(value) => setSector(value)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSummit()}
      >
        <Text style={styles.text}>Suivant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alerte") }
      >
        <Text style={styles.text}>Passer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    padding: 10,
  },
  subtitle: {
    fontSize: 28,
  },
});
