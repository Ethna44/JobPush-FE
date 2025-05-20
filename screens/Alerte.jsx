import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

export default function Alerte({ navigation }) {
  const [selectedValue, setSelectedValue] = useState("option1");

  const options = {
    option1: "Alerte en temps réel",
    option2: "Alerte une fois par jour",
    option3: "Alerte par mail une fois par jour",
  };

  const handleSummit = () => {
    fetch(`http://192.168.100.250:3000/users/alerts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alerts:selectedValue
      }) }).then(response => response.json()).then(data => {
        if(data.result){
           navigation.navigate("TabNavigator");
        }
      })
  };

  
  return (
    <View>
      <Text>Mon Alerte</Text>
      <View style={styles.radioButton}>
        <RadioButton.Android
          value="option1"
          status={selectedValue === "option1" ? "checked" : "unchecked"}
          onPress={() => setSelectedValue("option1")}
          color="#F72C03" // Custom color for the radio button
        />
        <Text
          style={styles.radioLabel}
          onPress={() => setSelectedValue("option1")}
        >
          Alerte en temps réel
        </Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton.Android
          value="option2"
          status={selectedValue === "option2" ? "checked" : "unchecked"}
          onPress={() => setSelectedValue("option2")}
          color="#F72C03" // Custom color for the radio button
        />
        <Text
          style={styles.radioLabel}
          onPress={() => setSelectedValue("option2")}
        >
          Alerte une fois par jour
        </Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="option3"
          status={selectedValue === "option3" ? "checked" : "unchecked"}
          onPress={() => setSelectedValue("option3")}
          color="#F72C03"
        />
        <Text
          style={styles.radioLabel}
          onPress={() => setSelectedValue("option3")}
        >
          Alerte par mail une fois par jour
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleSummit()} style={styles.button}>
        <Text style={styles.buttonText}>Confirmer l'alerte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TabNavigator")}
      >
        <Text style={styles.text}>Passer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row", // Arrange radio button and label in a row
    alignItems: "center", // Align items vertically in the center
  },
  radioLabel: {
    fontSize: 16, // Font size for the label
    color: "#333", // Dark gray color for the label
  },
});
