import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";

export default function Articles({ title, description, icon,onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.icon}>{icon}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 100,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F3E4E5",
    marginBottom: 20,
    padding: 5,
    shadowColor: "#2B3033",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    ...AppStyles.headline,
    borderBottomColor: "#F72C03",
    borderBottomWidth: 1,
    fontSize: 13,
  },
  description: AppStyles.important,
  icon: {
    position: "absolute",
    top: -10, //positionner l'élément
    right: -10, //positionner l'élément
    backgroundColor: "#F9F1F1",
    borderRadius: 50,
    padding: 8,
    zIndex: 1, //place l'élément au dessus du reste comme sur un système de calque
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
});
