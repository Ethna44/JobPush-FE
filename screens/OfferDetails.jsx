import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,

} from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useRoute } from "@react-navigation/native";

export default function OfferDetails() {
  const route = useRoute();
  const {
    title,
    compagny,
    logoLink,
    grade,
    contractType,
    publicationDate,
    streetNumber,
    streetName,
    city,
    zipCode,
    source,
    offerLink,
    description,
  } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Image></Image> */}
        <View style={styles.title}>
          <Text>{title}</Text>
          <Text>{compagny}</Text>
        </View>
        {/* <FontAwesome></FontAwesome> */}
      </View>

      <View style={styles.infoOffer}>
        {/* <FontAwesome></FontAwesome> */}
        <Text>Sur Glassdoor</Text>

        <View style={styles.infoDetails}>
          <Text>Publiée le : {publicationDate}</Text>
          <Text></Text>
          <Text>{source}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text>{description}</Text>
      </ScrollView>

      <View style={styles.ApplyButton}>
        {/* <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
