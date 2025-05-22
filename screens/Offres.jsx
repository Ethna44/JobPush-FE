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

export default function TabScreen1({ navigation }) {
  const [search, setSearch] = useState("");
  const [offersData, setOffersData] = useState([]);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID_FT;
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET_FT;
  const tokenManagerRef = useRef(null);

  if (!tokenManagerRef.current) {
    tokenManagerRef.current = new TokenManager(clientId, clientSecret);
  }
    
 useEffect(() => {
    fetch(`${EXPO_IP}/offers`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOffersData(data.offers)
      })
      .then(() =>   callOffresApi(tokenManagerRef.current))
  }, []);
  // console.log(offersData)
  
   const offer = offersData.map((data, i) => {
    // console.log(offer)
   
    return <JobCard key={i} {...data}  />;
  });

  return (
    <SafeAreaView style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.inputSearchContainer}>
          <TextInput
            placeholder="Recherche"
            style={styles.inputSearch}
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
          <FontAwesome name={"search"} size={18} color="#F72C03" />
        </View>
        <Text style={styles.title}>Offres</Text>

        <Button
          title="Go to StackScreen1"
          onPress={() => navigation.navigate("Accueil")}
        />
      </View>
      <View style={styles.jobContainer}>
       {offer}
      </View>

      
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: "65%",
    marginTop: 6,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: "30%",
    alignItems: "center",
    paddingTop: 8,
    backgroundColor: "#ec6e5b",
    borderRadius: 10,
  },
  textButton: {
    color: "#ffffff",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
  },
  inputSearch: {
    flex: 1,
    marginTop: 6,

    fontSize: 17,
    paddingRight: 8,
  },
  inputSearchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",

    borderBottomColor: "black",
    borderBottomWidth: 1,

    marginTop: 5,
  },
  card: {
    backgroundColor: "#F3E4E5",
    borderRadius: 12,
    width: "85%",
    height: "25%",
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 10,
  },
  source: {
    fontWeight: "bold",
  },
  textInfo: {
    fontSize: 16,
    fontStyle: "italic",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  jobContainer:{
    height:"100%"
  },
  // scrollView : {
  //   border
  // }
});
