import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Favorite(props) {
  const navigation = props.navigation;
  const [isLiked, setIsLiked] = useState(true);
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
    fontSize: 24,
    color: isLiked ? "#e74c3c" : "#ccc",
    position: 'absolute',
    bottom: 10, //positionner l'élément
    right: 10, //positionner l'élément
    backgroundColor : "#F9F1F1",
    borderRadius: 50,
    padding : 4,
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
        name="heart"
        onPress={() => handleLikeOffer()}
        style={heartIconStyle}
      />
    </TouchableOpacity>
  );

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
      style={styles.card}>
      <View style={styles.candidature}>
        <View>
          <Text style={AppStyles.headline}>{props.title}</Text>
          <Text style={AppStyles.important}>Entreprise: {props.contractType} </Text>
        </View>
        <Text style={AppStyles.body}>Candidature le : 14 novembre 2025 </Text>
      </View>
      {favoritePress}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "16%",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#F3E4E5",
    margin: 10,
    padding: 5,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
  },
  candidature: {
    height: "100%",
    width: "90%",
    justifyContent: "space-between",
  },
  cross: {
    height: "100%",
  },
});
