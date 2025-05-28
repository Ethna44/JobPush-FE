import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";

export default function TabScreen1() {
  const route = useRoute();
  const [subCategories, setSubCategories] = useState([]);
  const { title } = route.params;
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  useEffect(() => {
    // Remplace l'URL par celle de ton backend
    fetch(`${EXPO_IP}/articles/byCategory/${title}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result)
          setSubCategories(data.articles); // <-- articles et pas subCategories
        else setSubCategories([]);
      });
  }, [title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subCategories.map((data, i) => (
        <Articles key={i} title={data.title} description={data.description} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F1F1",
  },
  title: AppStyles.title,
  description: AppStyles.important,
});
