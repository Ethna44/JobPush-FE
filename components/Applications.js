import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { Modal } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [notes, setNotes] = useState(null);

  const handleTodoList = () => {
    setShowModal(true);
  };

  const handleNotes = () => {
    setShowNotes(true);
  };

  const modal = (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.todo}>
          <Text style={AppStyles.subtitle}>Todo List</Text>
          <View
            style={[
              AppStyles.inputContainer,
              { flexDirection: "row", flexWrap: "wrap" ,alignItems:"center"},
            ]}
          >
            <BouncyCheckbox
              size={25}
              fillColor="#F72C03"
              unFillColor="#F9F1F1"
              iconStyle={{ borderColor: "#F72C03" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{
                fontFamily: "Poppins_400Regular",
                textDecorationLine: "none",
              }}
              style={styles.checkbox}
            />
            <TextInput placeholder="Date de rappel" style={[AppStyles.input,{width:"80%"}]} />
            <BouncyCheckbox
              size={25}
              fillColor="#F72C03"
              unFillColor="#F9F1F1"
              iconStyle={{ borderColor: "#F72C03" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{
                fontFamily: "Poppins_400Regular",
                textDecorationLine: "none",
              }}
              style={styles.checkbox}
            />
            <TextInput placeholder="Date de rappel" style={[AppStyles.input,{width:"80%"}]} />
            <BouncyCheckbox
              size={25}
              fillColor="#F72C03"
              unFillColor="#F9F1F1"
              iconStyle={{ borderColor: "#F72C03" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{
                fontFamily: "Poppins_400Regular",
                textDecorationLine: "none",
              }}
              style={styles.checkbox}
            />
            <TextInput placeholder="Date de rappel" style={[AppStyles.input,{width:"80%"}]} />
            <BouncyCheckbox
              size={25}
              fillColor="#F72C03"
              unFillColor="#F9F1F1"
              iconStyle={{ borderColor: "#F72C03" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{
                fontFamily: "Poppins_400Regular",
                textDecorationLine: "none",
              }}
              style={styles.checkbox}
            />
            <TextInput placeholder="Date de rappel" style={[AppStyles.input,{width:"80%"}]} />
          </View>
          <View>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => handleNotes()}
            >
              <Text style={AppStyles.buttonText}>NOTES</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={AppStyles.buttonText}>FERMER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={AppStyles.buttonText}>CONFIRMER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const note = (
    <Modal visible={showNotes} transparent={true}>
      <View style={styles.modal}>
        <View style={[styles.todo, { height: "70%" }]}>
          <Text style={AppStyles.subtitle}>Notes</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              multiline={true}
              scrollEnabled={true}
              placeholder="Tape ta note"
              onChangeText={(value) => setNotes(value)}
              onFocus={() => setFocusedField("Notes")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => setShowNotes(false)}
            >
              <Text style={AppStyles.buttonText}>FERMER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => setShowNotes(false)}
            >
              <Text style={AppStyles.buttonText}>CONFIRMER</Text>
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
      {note}
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
    height: "60%",
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
  inputContainer: {
    width: "100%",
  },
  textArea: {
    height: "70%",
    textAlignVertical: "top",
    borderColorTop: AppStyles.color.text,
    borderTopWidth: 0.5,
  },
  checkbox: {
    width: "12%",
    padding: 5,
    paddingLeft: 0,
    // borderColor: "red",
    // borderWidth: 1,
  },
});
