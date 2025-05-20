import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Alerte() {
  return (
    <View>
      <Text>Mon Alerte</Text>
      <BouncyCheckbox
        size={35}
        fillColor="#F72C03"
        unFillColor="#F3E4E5"
        text="Alerte en temps réel"
        textStyle={{
          textDecorationLine: "none",
          color:"#2B3033"
        }}
      />
      <BouncyCheckbox
        size={35}
        fillColor="#F72C03"
        unFillColor="#F3E4E5"
        text="Alerte une fois par jour"
        textStyle={{
          textDecorationLine: "none",
          color:"#2B3033"
        }}
      />
      <BouncyCheckbox
        size={35}
        fillColor="#F72C03"
        unFillColor="#F3E4E5"
        text="Alerte une fois par jour par e-mail"
        textStyle={{
          textDecorationLine: "none",
          color:"#2B3033"
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
