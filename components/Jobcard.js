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
import { useSelector } from "react-redux";

export default function JobCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const token = useSelector((state) => state.user.token);

  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const formattedDate = new Date(props.PublicationDate).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ); //formatage de Date



const handleLikeOffer = () => {
  if (!isLiked) {
    fetch(`${EXPO_IP}/users/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerId: props._id,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
          setIsLiked(!isLiked);
          return;
        }
        setIsLiked(true); // tu avais oublié de le mettre ici
      });
  } else {
    fetch(`${EXPO_IP}/users/favorites/remove`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerId: props._id,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
          return;
        }
        setIsLiked(false); // ici aussi, tu mettais `setIsLiked(isLiked)` = inutile
      });
  }
};


  const heartIconStyle = {
    fontSize: 22,
    color: isLiked ? "#e74c3c" : "#ccc",
  };

  const favoritePress = (
    <TouchableOpacity>
      {" "}
      <FontAwesome
        name="heart"
        onPress={() => handleLikeOffer()}
        style={heartIconStyle}
      />{" "}
    </TouchableOpacity>
  );

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
        <View style={styles.inlineInfos}>
          <Text style={styles.textInfo}>{props.Compagny} - </Text>
          <Text style={styles.textInfo}>{props.city}</Text>
        </View>
        <View style={styles.rating}>
          {<FontAwesome name="star" color="#F72C03" size={16} />}
        </View>
        <Text style={styles.textInfo}>{props.typeContract}</Text>
        <Text style={styles.source}>{props.Source}</Text>
        <Text style={styles.textInfo}>Publié le : {formattedDate}</Text>
        {favoritePress}
      </View>
    </TouchableOpacity>
  );
    };




  

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3E4E5",
    borderRadius: 12,
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
    width: "85%",
    height: 200,
    marginBottom: 20,
  },
  inlineInfos : {
    flexDirection:'row',
  },
  photoContainer: {
    width: "45%",
    height: "100%",
    // borderColor: "green",
    // borderWidth: 1,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  headline: AppStyles.headline,
info: {
    width: "55%",
    height: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  textInfo: {
    ...AppStyles.body, 
    // borderColor: "red",
    // borderWidth: 1,
  },
  source: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
