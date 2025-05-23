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
import JobCard from "../components/Jobcard";
import { callOffresApi, reverseGeocode } from "../apiUtilis";
import AppStyles from "../AppStyles";

export default function TabScreen1({ navigation }) {
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
    fetch(`${EXPO_IP}/offers`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOffersData(data.offers);
      })
      .then(() => callOffresApi(tokenManagerRef.current));
  }, []);
  // console.log(offersData)

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
          <FontAwesome name={"search"} size={18} color="#F72C03" />
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
    alignItems: 'center',
    paddingVertical: 20,
  },
});
