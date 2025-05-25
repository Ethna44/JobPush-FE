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
import AppStyles from "../AppStyles";

export default function TabScreen1({ navigation }) {
  const token = useSelector((state) => state.user.token);
  const [search, setSearch] = useState("");
  const [offersData, setOffersData] = useState([]);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID_FT;
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET_FT;
  const tokenManagerRef = useRef(null);

  //   Job title = motsCles
  // sector = grandDomaine = code Domaine (json sector)
  // typeContract = typeContrat
  // remote= null
  // city = commune = code insee (json cities)
  // region = region = code region (json regions)

  if (!tokenManagerRef.current) {
    tokenManagerRef.current = new TokenManager(clientId, clientSecret);
  }

  useEffect(() => {
    fetch(`${EXPO_IP}/users/profile/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("🔑 Token récupéré :", token);
        const job = fusionWord(data.preferences[0].jobTitle);
        console.log("🔍 Recherche pour :", job);
        callOffresApi(
          tokenManagerRef.current,
          job,
          data.preferences[0].sector,
          data.preferences[0].contractType,
          data.preferences[0].region,
          data.preferences[0].city
        )
          .then((data) => {
            for (let o = 0; o < 5; o++) {
              const offer = data.resultats[o];
              const dateCreation = new Date(offer.dateCreation);
              offer.dateCreation = dateCreation
                .toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              console.log("Date de création:", offer.dateCreation);
              reverseGeocode(
                offer.lieuTravail.latitude,
                offer.lieuTravail.longitude
              ).then((address) => {
                console.log("Adresse récupérée:", address);
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
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Offre mise dans la BDD:", data);
                  });
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
  }, []);

  const offer = offersData.map((data, i) => {
    // console.log(offer)

    return <JobCard key={i} {...data} />;
  });

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
