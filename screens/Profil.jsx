import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { updateUser } from "../reducers/user";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

export default function Profil({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  // const user = useSelector()
  const [name, setName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [phonenumber, setPhoneNumber] = useState(null);
  const [streetNumber, setStreetNumber] = useState(null);
  const [streetName, setStreetName] = useState(null);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [contractType, setContractType] = useState(null);
  const [remote, setRemote] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [sector, setSector] = useState(null);
  const [cityJob, setCityJob] = useState(null);
  const [region, setRegion] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = () => {
    fetch(`${EXPO_IP}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        name: name,
        firstName: firstName,
        phoneNumber: phonenumber,
        streetNumber: streetNumber,
        streetName: streetName,
        city: city,
        zipCode: zipCode,
        contractType: contractType,
        remote: remote,
        jobTitle: jobTitle,
        sector: sector,
        cityJob: cityJob,
        region: region,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
          dispatch(
            updateUser({
              name: name,
              firstName: firstName,
              phoneNumber: phonenumber,
              address: [
                {
                  streetNumber: streetNumber,
                  streetName: streetName,
                  city: city,
                  zipCode: zipCode,
                },
              ],
            })
          );
          navigation.navigate("Alerte");
        } else {
          console.log(data.result);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Civilité</Text>
        <Text style={styles.important}>*obligatoires</Text>
        </View>
        <TextInput
          style={[styles.input, focusedField === "Name" && styles.inputFocused]}
          placeholder="Nom*"
          onChangeText={(value) => setName(value)}
          onFocus={() => setFocusedField("Name")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "FirstName" && styles.inputFocused,
          ]}
          placeholder="Prenom*"
          onChangeText={(value) => setFirstName(value)}
          onFocus={() => setFocusedField("FirstName")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "PhoneNumber" && styles.inputFocused,
          ]}
          placeholder="Numéro de téléphone*"
          onChangeText={(value) => setPhoneNumber(value)}
          onFocus={() => setFocusedField("PhoneNumber")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "StreetNumber" && styles.inputFocused,
          ]}
          placeholder="Numéro de rue"
          onChangeText={(value) => setStreetNumber(value)}
          onFocus={() => setFocusedField("StreetNumber")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "Address" && styles.inputFocused,
          ]}
          placeholder="Nom de rue"
          onChangeText={(value) => setStreetName(value)}
          onFocus={() => setFocusedField("Address")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[styles.input, focusedField === "City" && styles.inputFocused]}
          placeholder="Ville"
          onChangeText={(value) => setCity(value)}
          onFocus={() => setFocusedField("City")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "ZipCode" && styles.inputFocused,
          ]}
          placeholder="Code Postal"
          onChangeText={(value) => setZipCode(value)}
          onFocus={() => setFocusedField("ZipCode")}
          onBlur={() => setFocusedField(null)}
        />
        <Text style={styles.subtitle}>Mes préférences</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === "Contrat" && styles.inputFocused,
          ]}
          placeholder="Contrat"
          onChangeText={(value) => setContractType(value)}
          onFocus={() => setFocusedField("Contrat")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "CityJob" && styles.inputFocused,
          ]}
          placeholder="Ville"
          onChangeText={(value) => setCityJob(value)}
          onFocus={() => setFocusedField("CityJob")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "Region" && styles.inputFocused,
          ]}
          placeholder="Region"
          onChangeText={(value) => setRegion(value)}
          onFocus={() => setFocusedField("Region")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "Remote" && styles.inputFocused,
          ]}
          placeholder="Télétravail"
          onChangeText={(value) => setRemote(value)}
          onFocus={() => setFocusedField("Remote")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "JobTitle" && styles.inputFocused,
          ]}
          placeholder="Poste"
          onChangeText={(value) => setJobTitle(value)}
          onFocus={() => setFocusedField("JobTitle")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "Sector" && styles.inputFocused,
          ]}
          placeholder="Secteur"
          onChangeText={(value) => setSector(value)}
          onFocus={() => setFocusedField("Sector")}
          onBlur={() => setFocusedField(null)}
        />
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleSummit()}>
          <Text style={styles.buttonText}>SUIVANT</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
    // borderColor: "red",
    // borderWidth: 1,    
  },
  scrollableContainer: {
    width : "100%",
    // borderColor: "blue",
    // borderWidth: 1,  
  },
  textContainer: {
    marginLeft : 20
  },
  title: AppStyles.title,
  subtitle: AppStyles.subtitle,
  important: AppStyles.important,
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: "green",
    // borderWidth: 1, 
  },
  input: AppStyles.input,
  inputFocused : AppStyles.inputFocused,
  buttonContainer : {
    alignItems : 'flex-end',
    paddingBottom: 50,
    paddingRight: 20,
    paddingTop: 30,
    // borderColor: "pink",
    // borderWidth: 1, 
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
});
