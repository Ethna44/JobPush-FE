import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { TokenManager } from "../TokenManager";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { callOffresApi, reverseGeocode, fusionWord } from "../apiUtilis";
import JobCard from "../components/Jobcard";
import AppStyles from "../AppStyles";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

const LIMIT_OFFER = 10;

export default function TabScreen1({ navigation }) {
  const token = useSelector((state) => state.user.token);
  const [search, setSearch] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [checkEnd, setCheckEnd] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID_FT;
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET_FT;
  const tokenManagerRef = useRef(null);

  if (!tokenManagerRef.current) {
    tokenManagerRef.current = new TokenManager(clientId, clientSecret);
  }

  const fetchOffers = async () => {
    fetch(
      `${EXPO_IP}/offers?offset=${startIndex}&limit=${LIMIT_OFFER}&userToken=${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOffersData([...offersData, ...data.offers]);
        setStartIndex(startIndex + data.offers.length);

        if (data.offers.length < LIMIT_OFFER) {
          //console.log("is ended");
          setCheckEnd(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const updateProfile = async () => {
    fetch(`${EXPO_IP}/users/profile/${token}`)
      .then((response) => response.json())
      .then((data) => {
        const job = fusionWord(data.preferences[0].jobTitle);
        callOffresApi(
          tokenManagerRef.current,
          job,
          data.preferences[0].sector,
          data.preferences[0].contractType,
          data.preferences[0].region,
          data.preferences[0].city
        ).then((data) => {
          for (let o = 0; o < data.resultats.length; o++) {
            const offer = data.resultats[o];
            const dateCreation = new Date(offer.dateCreation);
            offer.dateCreation = dateCreation.toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            reverseGeocode(
              offer.lieuTravail.latitude,
              offer.lieuTravail.longitude
            ).then((address) => {
              const grade = Math.floor(Math.random() * 5) + 1;
              fetch(`${EXPO_IP}/offers/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: offer.intitule,
                  compagny: offer.entreprise.nom,
                  logoLink: offer.entreprise.logo || "",
                  grade: grade,
                  contractType: offer.typeContrat,
                  publicationDate: offer.dateCreation,
                  streetNumber: address.streetNumber || "",
                  streetName: address.streetName,
                  city: address.city,
                  zipCode: address.zipCode,
                  source: "France Travail",
                  offerLink: offer.origineOffre.urlOrigine,
                  description: offer.description,
                }),
              });
            });
          }
        });
      });
  };

  // useEffect(() => {
  //   if (!checkEnd) {
  //     fetchOffers();
  //   }
  // }, [checkEnd]);
    useFocusEffect(
    useCallback(() => {
      setOffersData([]);
      setStartIndex(0);
      setCheckEnd(false);
      fetchOffers().then(() => token && updateProfile());
    }, [])
  );

  const clearSearch = () => {
    setSearch('')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Offres d'emploi</Text>
        <View style={styles.inputSearchContainer}>
          <FontAwesome name="search" color="#F72C03" size={18} />
          <TextInput
            placeholder="Recherche"
            style={styles.inputSearch}
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
          <TouchableOpacity style={styles.cross} onPress={clearSearch}>
            <FontAwesome name='close' color='grey' size={18}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          {offersData
            .filter((offer) => {
              if (!search) return true;
              const searchLower = search.toLowerCase();
              return (
                (offer.title &&
                  offer.title.toLowerCase().includes(searchLower)) ||
                (offer.compagny &&
                  offer.compagny.toLowerCase().includes(searchLower)) ||
                (offer.source &&
                  offer.source.toLowerCase().includes(searchLower)) ||
                (offer.city && offer.city.toLowerCase().includes(searchLower))
              );
            })
            .map((data, i) => (
              <JobCard key={i} {...data} navigation={navigation} />
            ))}
        </View>
        <View>
          {!checkEnd && (
            <TouchableOpacity onPress={() => fetchOffers()} style={styles.load}>
              <Text style={styles.buttonText}>CHARGER PLUS</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    // borderColor: "green",
    // borderWidth: 1,
  },
  title: AppStyles.title,
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "pink",
    // borderWidth: 1,
  },
  inputSearch: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingBottom: 8,
  },
  inputSearchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderBottomColor: "#2B3033",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  scrollView: {
    // borderColor: "blue",
    // borderWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  load: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F72C03",
    borderRadius: 10,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 50,
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#F9F1F1",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  placeholderDropdown: AppStyles.placeholderDropdown,
  containerDropdownBottom: AppStyles.containerDropdownBottom,
  itemTextDropdown: AppStyles.itemTextDropdown,
  dropdown: AppStyles.dropdown,
});
