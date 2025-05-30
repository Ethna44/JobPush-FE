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
import { MaskedTextInput } from "react-native-mask-text";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL;
export default function Applications({ navigation, ...props }) {
  const token = useSelector((state) => state.user.token);
  const [showModal, setShowModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [notes, setNotes] = useState(null);
  const [candidateDate, setCandidateDate] = useState(null);
  const [relanceDate, setRelanceDate] = useState(null);
  const [interviewDate, setInterviewDate] = useState(null);
  const [thanksDate, setThanksDate] = useState(null);

  const handleTodoList = () => {
    setShowModal(true);
  };

  const handleNotes = () => {
    setShowNotes(true);
  };

  function formatDateForGoogle(dateStr) {
    // dateStr: "DD/MM/YYYY"
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    // Google Calendar format: YYYYMMDD
    return `${year}${month}${day}`;
  }

  function getGoogleEndDate(dateStr) {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    date.setDate(date.getDate() + 1);
    const endYear = date.getFullYear();
    const endMonth = String(date.getMonth() + 1).padStart(2, "0");
    const endDay = String(date.getDate()).padStart(2, "0");
    return `${endYear}${endMonth}${endDay}`;
  }

  const updateTodo = () => {
    fetch(
      `${EXPO_IP}/offers/applications/todo?offerId=${props.offerId._id}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recallDate: relanceDate,
          interviewDate: interviewDate,
          TyLetterDate: thanksDate,
          notes: notes,
        }),
      }
    );
  };

  React.useEffect(() => {
    const date = new Date(props.offerId.publicationDate);
    setCandidateDate(
      `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`
    );
  }, [props.offerId.publicationDate]);

  const modal = (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.todo}>
          <Text style={AppStyles.subtitle}>Todo List</Text>
          <View
            style={[
              AppStyles.inputContainer,
              { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
            ]}
          >
            <View style={styles.row}>
              <BouncyCheckbox
                isChecked={!!candidateDate}
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
              <Text style={styles.label}>Date de candidature:</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={candidateDate}
                onChangeText={setCandidateDate}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.row}>
              <BouncyCheckbox
                isChecked={!!relanceDate}
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
              <Text style={styles.label}>Date de Relance:</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={relanceDate}
                onChangeText={setRelanceDate}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.row}>
              <BouncyCheckbox
                isChecked={!!interviewDate}
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
              <Text style={styles.label}>Date de L'entretien:</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={interviewDate}
                onChangeText={setInterviewDate}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.row}>
              <BouncyCheckbox
                isChecked={!!thanksDate}
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
              <Text style={styles.label}>Lettre de remerciment:</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={thanksDate}
                onChangeText={setThanksDate}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => handleNotes()}
            >
              <Text style={AppStyles.buttonText}>NOTES</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={AppStyles.button}
            onPress={() => setShowCalendarModal(true)}
          >
            <Text style={AppStyles.buttonText}>AJOUTER A GOOGLE AGENDA</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <FontAwesome name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={() => {
                updateTodo(), setShowModal(false);
              }}
            >
              <Text style={AppStyles.buttonText}>SAUVEGARDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const note = (
    <Modal visible={showNotes} transparent={true}>
      <View style={styles.modal}>
        <View style={[styles.todo, { height: 500 }]}>
          <Text style={AppStyles.subtitle}>Notes</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              multiline={true}
              scrollEnabled={true}
              placeholder="Tape ta note"
              onChangeText={(value) => setNotes(value)}
              value={notes}
              onFocus={() => setFocusedField("Notes")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setShowNotes(false);
              }}
            >
              <FontAwesome name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const googleAgenda = (
    <Modal visible={showCalendarModal} transparent={true} animationType="fade">
      <View style={styles.modal}>
        <View style={[styles.todo, { height: "auto" }]}>
          <Text style={AppStyles.body}>Ajouter à Google Agenda</Text>
          {candidateDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Date%20de%20candidature&dates=${formatDateForGoogle(
                    candidateDate
                  )}/${getGoogleEndDate(
                    candidateDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText}>Candidature</Text>
            </TouchableOpacity>
          )}
          {relanceDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Date%20de%20relance&dates=${formatDateForGoogle(
                    relanceDate
                  )}/${getGoogleEndDate(
                    relanceDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText}>Relance</Text>
            </TouchableOpacity>
          )}
          {interviewDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Date%20d'entretien&dates=${formatDateForGoogle(
                    interviewDate
                  )}/${getGoogleEndDate(
                    interviewDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText}>Entretien</Text>
            </TouchableOpacity>
          )}
          {thanksDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lettre%20de%20remerciement&dates=${formatDateForGoogle(
                    thanksDate
                  )}/${getGoogleEndDate(
                    thanksDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText}>Remerciement</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setShowCalendarModal(false);
            }}
          >
            <FontAwesome name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  console.log(props.offerId.publicationDate);

  const dateCreation = new Date(props.offerId.publicationDate);
  const dateFormatted = dateCreation.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={AppStyles.inputSearch}>{props.offerId.title} </Text>
          <Text style={AppStyles.important}>{props.offerId.compagny}</Text>
        </View>
        <Text style={AppStyles.body}>Candidaté le: {dateFormatted} </Text>
      </View>
      <TouchableOpacity style={styles.todoContainer} onPress={handleTodoList}>
        <Text style={AppStyles.buttonText}>TODO LIST</Text>
        {showCalendarModal && googleAgenda}
        {note}
        {modal}
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
  textContainer: {
    height: "100%",
    width: "65%",
    justifyContent: "space-between",
  },
  todo: {
    height: 500,
    width: "80%",
    justifyContent: "space-between",
    backgroundColor: AppStyles.color.background,
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
  todoContainer: {
    ...AppStyles.button,
    width: "35%",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#FEDDD7",
    borderBottomWidth: 2,
    borderBottomColor: "#F72C03",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 2,
    // borderColor : "orange",
    // borderWidth: 1,
  },
  label: {
    ...AppStyles.body,
    fontSize: 12,
  },
  value: {
    ...AppStyles.body,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    //paddingHorizontal: 20,
    backgroundColor: "#F72C03",
    borderRadius: 50,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    // borderColor: "blue",
    // borderWidth: 1,
    width: 45,
    height: 45,
  },
});
