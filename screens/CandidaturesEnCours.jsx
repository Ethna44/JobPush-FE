import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet,ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppStyles from "../AppStyles";
import Applications from "../components/Applications";
import { useSelector } from "react-redux";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function CandidaturesEnCours({ navigation }) {
  const token = useSelector((state) => state.user.token);
  const [applicationsData, setApplicationsData] = useState([]);

  const fetchApplications = async () => {
    const response = await fetch(
      `${EXPO_IP}/offers/applications?token=${token}`
    );
    const data = await response.json();
    setApplicationsData(data.applications);
  };

  useFocusEffect(
    useCallback(() => {
      fetchApplications();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {applicationsData.length === 0 ? (
          <Text style={{ textAlign: "center", marinTop: 20 }}>
            Vous n’avez enregistré aucune offre.
          </Text>
        ) : (
          applicationsData.map((data, i) => (
            <Applications key={i} {...data} navigation={navigation} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    alignItems: "center",
    //  borderColor: "red",
    // borderWidth: 1,
  },
  title: AppStyles.title,
    scrollView: { 
    flex : 1,
    paddingVertical: 20,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
});
