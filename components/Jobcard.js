import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import AppStyles from "../AppStyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFavorite, updateUser, removeFavorite } from "../reducers/user";

export default function JobCard(props) {
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

  const navigation = props.navigation;
  // const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const favorites = useSelector((state) => state.user.profile.favorites);

  const dispatch = useDispatch();

  const handleLikeOffer = () => {
    fetch(
      `${EXPO_IP}/users/favorites${favorites?.includes(_id) ? "/remove" : "/"}`,
      {
        method: favorites?.includes(_id) ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: _id,
          token: token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
        } else {
          dispatch(
            favorites?.includes(_id) ? removeFavorite(_id) : addFavorite(_id)
          );
        }
      })
      .catch((e) => {
        Alert.alert(e.message);
      });
  };

  // //console.log("favorites:", favorites, "_id:", _id, "isFavorite:", isFavorite);

  const heartIconStyle = {
    fontSize: 24,
    color: favorites?.includes(_id) ? "#F72C03" : "#ccc", // islIked before
    position: "absolute",
    bottom: 10, //positionner l'élément
    right: 10, //positionner l'élément
    backgroundColor: "#F9F1F1",
    borderRadius: 50,
    padding: 4,
    zIndex: 2, //place l'élément au dessus du reste comme sur un système de calque
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  };

  const favoritePress = (
    <TouchableOpacity>
      <FontAwesome
        name={favorites?.includes(_id) ? "heart" : "heart-o"}
        onPress={() => handleLikeOffer()}
        style={heartIconStyle}
      />
    </TouchableOpacity>
  );

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (props.grade > i) {
      stars.push(<FontAwesome key={i} name="star" color="#F72C03" size={16} />);
    } else {
      stars.push(<FontAwesome key={i} name="star" color="#ccc" size={16} />);
    }
  }

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
        ></Image>
        {favoritePress}
      </View>
      <View style={styles.info}>
        <Text style={styles.headline}>
          {props.title} | {props.contractType}
        </Text>
        <View style={styles.inlineInfos}>
          <Text style={styles.textInfo}>
            {props.compagny} | {props.city}
          </Text>
        </View>
        <View style={styles.rating}>{stars}</View>
        <Text style={styles.source}>{props.source}</Text>
        <Text style={styles.textInfo}>Publié le : {props.publicationDate}</Text>
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
    width: "90%",
    height: 180,
    marginBottom: 20,
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  photoContainer: {
    width: "35%",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  headline: {
    ...AppStyles.headline,
    fontSize: 13,
  },
  info: {
    width: "65%",
    height: "100%",
    padding: 10,
    // borderColor: "blue",
    // borderWidth: 1,

    paddingLeft: 10,
    justifyContent: "center",
  },
  textInfo: {
    ...AppStyles.body,
    fontSize: 13,
    // borderColor: "red",
    // borderWidth: 1,
  },
  rating: {
    flexDirection: "row",
  },
  source: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
});
