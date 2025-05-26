import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";


export default function Articles({ props }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.subtitle}>{props.title}</Text>
        <Text style={AppStyles.important}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
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
