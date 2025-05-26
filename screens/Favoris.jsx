import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppStyles from "../AppStyles";
import Favorite from "../components/Favorite";

export default function CandidaturesEnCours() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <Favorite/>
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