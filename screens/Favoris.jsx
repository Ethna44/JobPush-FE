import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AppStyles from "../AppStyles";
import Favorite from "../components/Favorite";
import { useSelector } from "react-redux";
import JobCard from "../components/Jobcard";

export default function CandidaturesEnCours({navigation}) {
  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
  const getFavorites = async () => {
    // 1. Récupérer le profil utilisateur pour avoir les IDs des favoris
      const res = await fetch(`${EXPO_IP}/users/profile/${token}`);
      const data = await res.json();
      if (data.result && data.favorites && data.favorites.length > 0) {
        console.log(data.favorites)
        // 2. Récupérer les détails des offres favorites
        const offersRes = await fetch(`${EXPO_IP}/offers/byIds`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: data.favorites }),
        });
        const offersData = await offersRes.json();
        setFavorites(offersData.offers || []);
      } else {
        setFavorites([]);
      }
    };
    if (token) getFavorites();
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <ScrollView style={{ width: "100%" }}>
          {favorites.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>Aucune offre en favori.</Text>
          ) : (
            favorites.map((data, i) => (
              <JobCard key={i} {...data} navigation={navigation} />
            ))
          )}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    justifyContent: 'center',
  },
 title: {
  ...AppStyles.title,
  textAlign: 'center'},
  scrollView: {
    // borderColor: "blue",
    // borderWidth: 1,
    width: "100%",
    paddingVertical: 20,
  },
});