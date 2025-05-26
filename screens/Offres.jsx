import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { TokenManager } from "../TokenManager";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { callOffresApi, reverseGeocode, fusionWord } from "../apiUtilis";
import JobCard from "../components/Jobcard";
import AppStyles from "../AppStyles";

export default function TabScreen1({ navigation }) {
  const token = useSelector((state) => state.user.token);
  const [search, setSearch] = useState("");
  const [offersData, setOffersData] = useState([]);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID_FT;
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET_FT;
  const tokenManagerRef = useRef(null);

  if (!tokenManagerRef.current) {
    tokenManagerRef.current = new TokenManager(clientId, clientSecret);
  }

  const fetchOffers = async () => {
    fetch(`${EXPO_IP}/offers`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOffersData(data.offers);
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
          for (let o = 0; o < 5; o++) {
            const offer = data.resultats[o];
            const dateCreation = new Date(offer.dateCreation);
            offer.dateCreation = dateCreation.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
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
                  source: "Pôle Emploi",
                  offerLink: offer.origineOffre.urlOrigine,
                  description: offer.description,
                }),
              });
            });
          }
        });
      });
  };

  useEffect(() => {
    fetchOffers().then(() => token && updateProfile());
  }, [token]);

  const offer = offersData.map((data, i) => {
    return <JobCard key={i} {...data} />;
  });

  console.log("offersData", offersData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Offres d'emploi</Text>
        <View style={styles.inputSearchContainer}>
          <TextInput
            placeholder="Recherche"
            style={styles.inputSearch}
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>{offer}</View>
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
    marginTop: 6,
    fontSize: 17,
    paddingBottom: 8,
  },
  inputSearchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderBottomColor: "#2B3033",
    borderBottomWidth: 1,
    marginTop: 5,
  },
  scrollView: {
    // borderColor: "blue",
    // borderWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
});
