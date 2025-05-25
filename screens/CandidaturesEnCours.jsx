import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AppStyles from "../AppStyles";

export default function CandidaturesEnCours() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Candidatures</Text>
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
