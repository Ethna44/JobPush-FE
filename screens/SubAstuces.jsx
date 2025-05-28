import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AppStyles from "../AppStyles";

// useEffect(() => {
//   // Remplace l'URL par celle de ton backend
//   fetch(`http://<TON_IP_BACKEND>:<PORT>/articles/subCategory/${category}`)
//     .then(res => res.json())
//     .then(data => {
//       if (data.result) setSubCategories(data.subCategories);
//       else setSubCategories([]);
//     });
// }, [category]); // <-- dépendance sur category

export default function TabScreen1({ navigation }) {
  const route = useRoute();
  const { title } = route.params; // <-- Correction ici

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F1F1",
  },
  title: AppStyles.title,
  description: AppStyles.important,
});
