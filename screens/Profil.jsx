import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import AppStyles from "../AppStyles";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import cities from "../json/cities.json";
import secteur from "../json/sector.json";
import teletravail from "../json/remote.json";
import contrat from "../json/contrat.json";
import regions from "../json/regions.json";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
export default function Profil({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
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
  const [errorMessage, setErrorMessage] = useState(null);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (errorMessage && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [errorMessage]);

  const citiesList = cities.cities
    .filter((city) => city.label) // garde seulement ceux qui ont un label
    .map((city) => ({
      ...city,
      label: city.label.charAt(0).toUpperCase() + city.label.slice(1),
      value: city.label.charAt(0).toUpperCase() + city.label.slice(1),
    }));

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
          console.log(data);
          setErrorMessage(
            data.message || "Une erreur est survenue. Veuillez réessayer."
          );
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Mon profil</Text>
      <ScrollView style={styles.scrollableContainer} ref={scrollRef}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Civilité</Text>
          <Text style={styles.important}>*obligatoires</Text>
        </View>
        <View style={styles.inputContainer}>
          {errorMessage && (
            <Text style={{ color: "red", margin: 10 }}>{errorMessage}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              focusedField === "Name" && styles.inputFocused,
            ]}
            placeholder="Nom*"
            placeholderTextColor={errorMessage && "rgba(255, 0, 0, 0.4)"}
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
            placeholderTextColor={errorMessage && "rgba(255, 0, 0, 0.4)"}
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
            placeholderTextColor={errorMessage && "rgba(255, 0, 0, 0.4)"}
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
            style={[
              styles.input,
              focusedField === "City" && styles.inputFocused,
            ]}
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
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Mes préférences</Text>
        </View>
        <View style={styles.inputContainer}>
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
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderDropdown}
            containerStyle={styles.containerDropdown}
            itemContainerStyle={styles.itemContainerDropdown}
            data={secteur}
            labelField="label"
            valueField="code"
            placeholder="Secteur"
            value={sector}
            onChange={(item) => setSector(item.value)}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderDropdown}
            containerStyle={styles.containerDropdown}
            itemContainerStyle={styles.itemContainerDropdown}
            data={contrat}
            labelField="label"
            valueField="value"
            placeholder="Contrat"
            value={contractType}
            onChange={(item) => setContractType(item.value)}
            search // Active la barre de recherche
            searchPlaceholder="Type de contrat"
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderDropdown}
            containerStyle={styles.containerDropdown}
            itemContainerStyle={styles.itemContainerDropdown}
            data={citiesList}
            labelField="label"
            valueField="value"
            placeholder="Ville"
            value={cityJob}
            onChange={(item) => setCityJob(item.value)}
            search // Active la barre de recherche
            searchPlaceholder="Type de contrat"
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderDropdown}
            containerStyle={styles.containerDropdown}
            itemContainerStyle={styles.itemContainerDropdown}
            data={regions}
            labelField="label"
            valueField="code"
            placeholder="Region"
            value={region}
            onChange={(item) => setRegion(item.value)}
            search // Active la barre de recherche
            searchPlaceholder="Rechercher une région"
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderDropdown}
            containerStyle={styles.containerDropdown}
            itemContainerStyle={styles.itemContainerDropdown}
            data={teletravail}
            labelField="label"
            valueField="value"
            placeholder="Remote"
            value={remote}
            onChange={(item) => setRemote(item.value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>SUIVANT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
    paddingTop: 20,
    // borderColor: "red",
    // borderWidth: 1,
  },
  scrollableContainer: {
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  textContainer: {
    marginLeft: 20,
  },
  title: AppStyles.title,
  subtitle: AppStyles.subtitle,
  important: AppStyles.important,
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  input: AppStyles.input,
  inputFocused: AppStyles.inputFocused,
  dropdown: AppStyles.dropdown,
  placeholderDropdown: AppStyles.placeholderDropdown,
  containerDropdown: AppStyles.containerDropdown,
  itemContainerDropdown: AppStyles.itemContainerDropdown,
  buttonContainer: {
    alignItems: "flex-end",
    paddingBottom: 50,
    paddingRight: 20,
    paddingTop: 30,
    // borderColor: "pink",
    // borderWidth: 1,
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
});
