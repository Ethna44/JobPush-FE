import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // https://oblador.github.io/react-native-vector-icons/#FontAwesome

//un tableau qui contient les articles
const articles = [
  {
    title: "Preparer sa candidature",
    description:
      "Rédiger un CV et une lettre de motivation adaptés à l'offre d'emploi.",
    icon: <FontAwesome name={"file-text-o"} size={22} color={"#F72C03"} />,
  },
  {
    title: "Reussir son entretien",
    description:
      "Préparer des réponses aux questions courantes et des questions à poser.",
    icon: <FontAwesome name={"handshake-o"} size={22} color={"#F72C03"} />,
  },
  {
    title: "Stratégie de recherche d'emploi",
    description:
      "Utiliser les réseaux sociaux, les sites d'emploi et le réseautage pour trouver des opportunités.",
    icon: <FontAwesome name={"search"} size={22} color={"#F72C03"} />,
  },
  {
    title: "Conseils métiers",
    description:
      "Explorer les tendances du marché, les compétences demandées et les opportunités de carrière.",
    icon: <FontAwesome name={"comment"} size={22} color={"#F72C03"} />,
  },
  {
    title: "Soft skills",
    description:
      "Développer des compétences interpersonnelles essentielles pour le milieu professionnel.",
    icon: <FontAwesome name={"group"} size={22} color={"#F72C03"} />,
  },
];
export default function TabScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Astuces</Text>
      {articles.map((article, index) => (
        <Articles
          key={index}
          title={article.title}
          description={article.description}
          icon={article.icon}
          onPress={() =>
            navigation.navigate("SubAstuces", {
              title: article.title,
              icon: article.icon,
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
  title: AppStyles.title,
});
