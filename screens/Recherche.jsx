import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import AppStyles from "../AppStyles";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";
import citie from "../json/citie.json";
import secteur from "../json/sector.json";
import teletravail from "../json/remote.json";
import contrat from "../json/contrat.json";
import regions from "../json/regions.json";
const { width } = Dimensions.get("window");

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

export default function Recherche({navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const [contractType, setcontractType] = useState(null);
  const [remote, setRemote] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [sector, setSector] = useState(null);
  const [cityJob, setCityJob] = useState(null);
  const [region, setRegion] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

 const handleSubmit = async () => {
    const response = await fetch(`${EXPO_IP}/users/addPreferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        contractType: contractType,
        remote: remote,
        jobTitle: jobTitle,
        sector: sector,
        cityJob: cityJob,
        region: region,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.result) {
        navigation.navigate("Offres");
      console.log("Préférence mise à jour avec succès");
    } else {
      console.error("Erreur lors de la mise à jour des préférences");
    }
  }
  };

  return (
    <View style={styles.container}>
      <Text style={AppStyles.title}>Nouvelle recherche d'emploi</Text>
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
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={secteur}
          labelField="label"
          valueField="code"
          placeholder="Secteur"
          value={sector}
          onChange={(item) => setSector(item.code)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={contrat}
          labelField="label"
          valueField="value"
          placeholder="Contrat"
          value={contractType}
          onChange={(item) => setcontractType(item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={citie}
          labelField="name"
          valueField="insee"
          placeholder="Ville"
          value={cityJob}
          onChange={(item) => setCityJob(item.insee)}
          search // Active la barre de recherche
          searchPlaceholder="Ville"
          inputSearchStyle={styles.inputSearch}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={regions}
          labelField="label"
          valueField="code"
          placeholder="Region"
          value={region}
          onChange={(item) => setRegion(item.code)}
          search // Active la barre de recherche
          searchPlaceholder="Rechercher une région"
          inputSearchStyle={styles.inputSearch}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownTop}
          itemTextStyle={styles.itemTextDropdown}
          data={teletravail}
          labelField="label"
          valueField="value"
          placeholder="Remote"
          value={remote}
          onChange={(item) => setRemote(item.value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>ENREGISTRER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
  },
  title: { ...AppStyles.title, marginLeft: 20 },
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
  containerDropdownBottom: AppStyles.containerDropdownBottom,
  containerDropdownTop: AppStyles.containerDropdownTop,
  itemTextDropdown: AppStyles.itemTextDropdown,
  inputSearch: AppStyles.inputSearch,
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
