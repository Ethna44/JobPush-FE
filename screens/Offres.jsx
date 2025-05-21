import { StyleSheet, Text, View, Button } from "react-native";

export default function TabScreen1({ navigation }) {
  return (
     <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Offres</Text>
      <Button
        title="Go to StackScreen1"
        onPress={() => navigation.navigate("Accueil")}
      />
    </View>
    <View style={styles.inputContainer}>
        <TextInput
          placeholder="New city"
          onChangeText={(value) => setCity(value)}
          value={city}
          style={styles.input}
        />
        <TouchableOpacity
       
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>
       <ScrollView contentContainerStyle={styles.scrollView}>
        {places}
      </ScrollView>
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
   inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: "65%",
    marginTop: 6,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: "30%",
    alignItems: "center",
    paddingTop: 8,
    backgroundColor: "#ec6e5b",
    borderRadius: 10,
  },
  textButton: {
    color: "#ffffff",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
  },
});
