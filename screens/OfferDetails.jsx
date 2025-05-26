import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function OfferDetails() {
  const route = useRoute();
  const [isLiked, setIsLiked] = useState(false);
  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const {
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
    _id,
  } = route.params;

  const handleLikeOffer = () => {
    if (!isLiked) {
      fetch(`${EXPO_IP}/users/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: _id,
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            setErrorMessage(
              data.error || "An error occurred. Please try again."
            );
            setIsLiked(!isLiked);
            return;
          }
          setIsLiked(true);
        });
    } else {
      fetch(`${EXPO_IP}/users/favorites/remove`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: _id,
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            setErrorMessage(
              data.error || "An error occurred. Please try again."
            );
            return;
          }
          setIsLiked(false);
        });
    }
  };

  const heartIconStyle = {
    fontSize: 28,
    color: isLiked ? "#e74c3c" : "#ccc",
    marginRight: 12, // décale le coeur vers la gauche
  };

  const favoritePress = (
    <TouchableOpacity>
      <FontAwesome
        name="heart"
        onPress={handleLikeOffer}
        style={heartIconStyle}
      />
    </TouchableOpacity>
  );

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (grade > i) {
      stars.push(<FontAwesome key={i} name="star" color="#F72C03" size={16} />);
    } else {
      stars.push(<FontAwesome key={i} name="star" size={16} />);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
       <View style={styles.photoContainer}>
         <Image source={require("../assets/logoJobPush-Photoroom.jpg")}
                  style={styles.logo}>
                </Image>
                </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.companyRow}>
            <Text>{compagny}</Text>
            {favoritePress}
          </View>
        </View>
      </View>

      <View style={styles.infoOffer}>
        <Text style={styles.source}>{stars} sur Glassdoor</Text>
        <View style={styles.infoDetails}>
          <Text>Publiée le : {publicationDate}</Text>
          <Text style={styles.source}>{source}</Text>
        </View>
      </View>

      <ScrollView style={styles.floatingBox}>
        <Text>{description}</Text>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.ApplyButton}>
          <Text style={styles.buttonText}>CANDIDATER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ApplyButton}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 24,
  },
  floatingBox: {
    maxWidth: "85%",
    maxHeight: "55%",
    backgroundColor: "#F3E4E5",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#2B3033",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginVertical: 12,
  },
   photoContainer: {
    width: "15%",
    height: "25%",
    borderRadius : 50,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  header: {
    width: "90%",
    maxWidth: 400,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
    marginBottom: 8,
  },
  title: AppStyles.subtitle,
  infoOffer: {
    width: "90%",
    maxWidth: 400,
    marginBottom: 4,
  },
  infoDetails: AppStyles.body,

  source: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },

  ApplyButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F72C03",
    borderRadius: 18,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 7,
    marginTop: 4,
    borderColor: "blue",
    borderWidth: 1,
    maxWidth: " 35%",
  },

  buttonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#F9F1F1",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },

  bottomButtons: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: "red",
    borderWidth: 1,
    alignSelf: "center",
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 180, // ajuste la largeur selon ton besoin ou utilise "100%" si tu veux toute la largeur du parent
    marginTop: 2,
    marginBottom: 2,
    width: "100%",
  },
});
