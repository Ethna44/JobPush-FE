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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import AppStyles from "../AppStyles";

export default function JobCard(props) {

  const [isLiked,setIsLiked] = useState(false)

  const formattedDate = new Date(props.PublicationDate).toLocaleDateString("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric"
}); //formatage de Date





  
  const handleLikeOffer = () => {
    setIsLiked(!isLiked)
  };
 const heartIconStyle = {
  fontSize: 22,
  color: isLiked ? "#e74c3c" : "#ccc"
}; fetch(`${EXPO_IP}/users/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       offerId : props._id
       
        
      }),
    })
 .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
          return;
        }

        navigation.navigate("TabNavigator");
      });
  };




const favoritePress =   <TouchableOpacity> <FontAwesome name="heart" onPress={() => handleLikeOffer()  } style={heartIconStyle}  /> </TouchableOpacity>


  return (

    
    <TouchableOpacity style={styles.card}>
      <View style={styles.photoContainer}>
        <Image
          source={require("../assets/logoJobPush-Photoroom.jpg")}
          style={styles.logo}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.headline}>{props.Title}</Text>

        <Text style={styles.textInfo}>{props.Compagny}</Text>

        <View style={styles.rating}>
          {<FontAwesome name="star" color="red" size={16} />}
        </View>
        <Text style={styles.textInfo}>{props.typeContract }</Text>
        <Text style={styles.textInfo}>{props.City}</Text>
        <Text style={styles.source}>{props.Source}</Text>
              <Text> Publié le : {formattedDate}</Text>
              {favoritePress}
      </View>
      <View>
   
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomColor: "#2B3033",
    borderBottomWidth: 1,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#F3E4E5",
    borderRadius: 12,
    width: "85%",
    height: "25%",
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "yellow",
    // borderWidth: 1,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
 
  source: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  
  textInfo: AppStyles.body,

  info: {
    width: "65%",
    height: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  
  headline: AppStyles.headline,
  photoContainer: {
    width: "35%",
    height: "100%",
    // borderColor: "green",
    // borderWidth: 1,
  },
});
