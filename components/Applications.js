import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { Modal } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Applications() {
  const [showModal, setShowModal] = useState(false);

  const handleTodoList = () => {
    setShowModal(true);
  };

  const modal = (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.todo}>
          <View style={AppStyles.inputContainer}>
            <Text style={AppStyles.subtitle}>Todo List</Text>
            <Text>Date de rappel </Text>
            <Text>Date d'entretien</Text>
            <Text>Reponse</Text>
            <Text>Lettre de remerciement</Text>
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unFillColor="#FFFFFF"
              text="Date de rappel"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: "Poppins_400Regular" ,  textDecorationLine: "none",}}
              
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={AppStyles.buttonText}>Fermer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={AppStyles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.candidature}>
        <View>
          <Text style={AppStyles.inputSearch}>
            Developpeur JavaScript FrontEnd
          </Text>
          <Text style={AppStyles.important}>Entreprise: JobPush </Text>
        </View>
        <Text style={AppStyles.body}>Candidaté le : 14 novembre 2025 </Text>
      </View>
      <TouchableOpacity style={AppStyles.button} onPress={handleTodoList}>
        <Text style={AppStyles.buttonText}>Todo List</Text>
      </TouchableOpacity>
      {modal}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "16%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E4E5",
    margin: 10,
    padding: 5,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
  },
  candidature: {
    height: "100%",
    width: "70%",
    justifyContent: "space-between",
  },
  todo: {
    height: "50%",
    width: "80%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
