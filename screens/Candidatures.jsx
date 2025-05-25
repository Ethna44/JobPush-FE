import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import EnCours from "./CandidaturesEnCours";
import Favoris from "./Favoris";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TopTab = createMaterialTopTabNavigator();

export default function Candidatures() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#2B3033" , height: 20 },
        tabBarIndicatorStyle: { backgroundColor: "#F72C03", height: 5 },
      }}
    >
      <TopTab.Screen name="En cours" component={EnCours} />
      <TopTab.Screen name="Favoris" component={Favoris} />
    </TopTab.Navigator>
  );
}
