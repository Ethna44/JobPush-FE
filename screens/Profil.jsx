import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

export default function Profil({ navigation }) {
  const dispatch = useDispatch()
  // const user = useSelector()
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

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = () => {
    fetch(`${EXPO_IP}/users`, {
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
        //navigation.navigate("Alerte")
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
        <View style={styles.inputContainer}>
          <TextInput 
          style={[styles.input, focusedField === 'Name' && styles.inputFocused]} 
          placeholder="Nom*" 
          onChangeText={(value) => setName(value)}
          onFocus={() => setFocusedField('Name')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'FirstName' && styles.inputFocused]}
          placeholder="Prenom*" 
          onChangeText={(value) => setFirstName(value)}
          onFocus={() => setFocusedField('FirstName')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'PhoneNumber' && styles.inputFocused]}
          placeholder="Numéro de téléphone*" 
          onChangeText={(value) => setPhoneNumber(value)}
          onFocus={() => setFocusedField('PhoneNumber')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'StreetNumber' && styles.inputFocused]}
          placeholder="Numéro de rue" 
          onChangeText={(value) => setStreetNumber(value)}
          onFocus={() => setFocusedField('StreetNumber')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'Address' && styles.inputFocused]} 
          placeholder="Nom de rue" 
          onChangeText={(value) => setAddress(value)}
          onFocus={() => setFocusedField('Address')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'City' && styles.inputFocused]} 
          placeholder="Ville" 
          onChangeText={(value) => setCity(value)}
          onFocus={() => setFocusedField('City')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput
          style={[styles.input, focusedField === 'ZipCode' && styles.inputFocused]}  
          placeholder="Code Postal" 
          onChangeText={(value) => setZipCode(value)}
          onFocus={() => setFocusedField('ZipCode')}
          onBlur={() => setFocusedField(null)}/>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Mes préférences</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
          style={[styles.input, focusedField === 'Contrat' && styles.inputFocused]} 
          placeholder="Contrat" 
          onChangeText={(value) => setContratType(value)}
          onFocus={() => setFocusedField('Contrat')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'CityJob' && styles.inputFocused]} 
          placeholder="Ville" 
          onChangeText={(value) => setCityJob(value)}
          onFocus={() => setFocusedField('CityJob')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'Region' && styles.inputFocused]} 
          placeholder="Region" 
          onChangeText={(value) => setRegion(value)}
          onFocus={() => setFocusedField('Region')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'Remote' && styles.inputFocused]} 
          placeholder="Télétravail" 
          onChangeText={(value) => setRemote(value)}
          onFocus={() => setFocusedField('Remote')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'JobTitle' && styles.inputFocused]}
          placeholder="Poste" 
          onChangeText={(value) => setJobTitle(value)}
          onFocus={() => setFocusedField('JobTitle')}
          onBlur={() => setFocusedField(null)}/>
          <TextInput 
          style={[styles.input, focusedField === 'Sector' && styles.inputFocused]}
          placeholder="Secteur" 
          onChangeText={(value) => setSector(value)}
          onFocus={() => setFocusedField('Sector')}
          onBlur={() => setFocusedField(null)}/>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => /* handleSubmit() */ navigation.navigate("Alerte")}>
            <Text style={styles.buttonText}>SUIVANT</Text>
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
  button : AppStyles.button,
  buttonText : AppStyles.buttonText,
});
