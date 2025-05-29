import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";
import { FontAwesome } from "@expo/vector-icons";

export default function TabScreen1({ navigation }) {
  const route = useRoute();
  const [subCategories, setSubCategories] = useState([]);
  const { title, icon } = route.params;
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  useEffect(() => {
    // Remplace l'URL par celle de ton backend
    fetch(`${EXPO_IP}/articles/byCategory/${title}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setSubCategories(data.articles);
        else setSubCategories([]);
      });
  }, [title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subCategories.map((data, i) => (
        <Articles
          key={i}
          title={data.title}
          description={data.description}
          icon={icon}
          onPress={() =>
            navigation.navigate("ArticleDetails", {
              title: data.title,
              description: data.description,
              content: data.content,
              author: data.author,
              tags: data.tags,
            })
          }
        />
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
  title: { ...AppStyles.title ,
      textAlign:"center"
  },

  description: AppStyles.important,
});
