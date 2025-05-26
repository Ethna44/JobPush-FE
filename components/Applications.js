import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";

export default function Applications() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.candidature}>
        <View>
          <Text>Develloppeur JavaScript</Text>
          <Text>Entreprise: JobPush</Text>
        </View>
        <Text>Candidaté</Text>
      </View>
      <TouchableOpacity style={styles.todo}>
        <View style={AppStyles.button}>
          <Text>To Do List</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "15%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
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
    width: "75%",
    justifyContent: "space-between",
    borderColor: "#2B3033",
    borderWidth: 1,
  },
  todo: {
    height: "60%",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3033",
    borderWidth: 1,
  },
});
