import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AppStyles from "../AppStyles";
import Favorite from "../components/Favorite";
import { useSelector } from "react-redux";

export default function CandidaturesEnCours() {
  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
  const getFavorites = async () => {
    fetch(`${EXPO_IP}/users/profile/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.favorites && data.favorites.length > 0) {
          fetch(`${EXPO_IP}/offers/byIds`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: data.favorites }),
        });
        setFavorites(offersData.offers || []);
        } else {
          setFavorites([]);
        }
      })
    };
    if (token) getFavorites();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <ScrollView style={{ width: "100%" }}>
          {favorites.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>Aucune offre en favori.</Text>
          ) : (
            favorites.map((offer, idx) => (
              <Favorite key={offer._id || idx} {...offer} />
            ))
          )}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    alignItems: "center",
  },
 title: AppStyles.title,
});