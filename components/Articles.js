import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";

export default function Articles({props}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subtitle}>Comment rédiger un CV efficace ?</Text>
        <Text style={AppStyles.important}>
          Découvrez nos conseils pour créer un CV qui attire l'attention des
          recruteurs.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "15%",
    alignItems: "center",
    borderRadius: 10,
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
  title: AppStyles.title,
  subtitle: AppStyles.headline,
});
