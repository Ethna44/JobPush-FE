import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Favorite() {
  return (
    <TouchableOpacity style={styles.container} >
      <View style={styles.candidature}>
        <View>
          <Text style={AppStyles.headline}>Developpeur TypeScript</Text>
          <Text style={AppStyles.important}>Entreprise: JobPush </Text>
        </View>
        <Text style={AppStyles.body}>Candidaté le : 14 novembre 2025 </Text>
      </View>
      <TouchableOpacity style={styles.cross}>
        <FontAwesome name="times" size={35} color="#F72C03" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "16%",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#F3E4E5",
    margin: 10,
    padding: 5,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 30,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
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
