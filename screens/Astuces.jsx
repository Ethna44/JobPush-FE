import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";

//un tableau qui contient les articles
const articles = [
  {
    title: "Preparer sa Candidature",
    description:
      "Rédiger un CV et une lettre de motivation adaptés à l'offre d'emploi.",
  },
  {
    title: "Reussir son Entretien",
    description:
      "Préparer des réponses aux questions courantes et des questions à poser.",
  },
  {
    title: "Strategies de Recherche d'Emploi",
    description:
      "Utiliser les réseaux sociaux, les sites d'emploi et le réseautage pour trouver des opportunités.",
  },
  {
    title: "Conseils Metiers",
    description:
      "Explorer les tendances du marché, les compétences demandées et les opportunités de carrière.",
  },
  {
    title: "Soft Skills",
    description:
      "Développer des compétences interpersonnelles essentielles pour le milieu professionnel.",
  },
];
const article = articles.map((article, index) => {
  return (
    <Articles
      key={index}
      props={{
        title: article.title,
        description: article.description,
      }}
    />
  );
});

export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Astuces</Text>
      {article}
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
});
