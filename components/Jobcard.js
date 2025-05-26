import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import AppStyles from "../AppStyles";
import { useSelector } from "react-redux";

export default function JobCard(props) {
  const navigation = props.navigation;
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const {
    _id,
    title,
    compagny,
    logoLink,
    grade,
    contractType,
    publicationDate,
    streetNumber,
    streetName,
    city,
    zipCode,
    source,
    offerLink,
    description,
  } = props;

  const handleLikeOffer = () => {
    const url = `${EXPO_IP}/users/favorites${isLiked ? "/remove" : ""}`;
    const method = isLiked ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offerId: _id, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          setErrorMessage(data.error || "Une erreur est survenue.");
        } else {
          setIsLiked(!isLiked);
        }
      });
  };

  const heartIconStyle = {
    fontSize: 22,
    color: isLiked ? "#e74c3c" : "#ccc",
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Annonce", {
          title,
          compagny,
          logoLink,
          grade,
          contractType,
          publicationDate,
          streetNumber,
          streetName,
          city,
          zipCode,
          source,
          offerLink,
          description,
        })
      }
      style={styles.card}
    >
      <View style={styles.photoContainer}>
        <Image
          source={require("../assets/logoJobPush-Photoroom.jpg")}
          style={styles.logo}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.headline}>{title}</Text>

        <View style={styles.inlineInfos}>
          <Text style={styles.textInfo}>{compagny} - </Text>
          <Text style={styles.textInfo}>{city}</Text>
        </View>

        <View style={styles.rating}>
          <FontAwesome name="star" color="#F72C03" size={16} />
        </View>

        <Text style={styles.textInfo}>{contractType}</Text>
        <Text style={styles.source}>{source}</Text>
        <Text style={styles.textInfo}>Publié le : {publicationDate}</Text>

        <TouchableOpacity onPress={handleLikeOffer}>
          <FontAwesome name="heart" style={heartIconStyle} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3E4E5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#2B3033",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
    width: "85%",
    height: 200,
    marginBottom: 20,
  },
  inlineInfos: {
    flexDirection: "row",
  },
  photoContainer: {
    width: "45%",
    height: "100%",
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
    paddingLeft: 10,
    justifyContent: "center",
  },
  textInfo: {
    ...AppStyles.body,
  },
  source: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
