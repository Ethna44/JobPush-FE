import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

export default function StackScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Inscription")} style={styles.button}>
        <Text style={styles.text}>S'inscrire</Text>
      </TouchableOpacity>

      <Text>OU</Text>
     <TouchableOpacity onPress={() => navigation.navigate("Inscription")} style={styles.button}>
        <Text style={styles.text}>Se Connecter</Text>
      </TouchableOpacity>
      <Text>S'identifier avec google</Text>
      <Button title="Google" onPress={() => navigation.navigate("Connexion")}  />
    </View>
  );
}

const styles = StyleSheet.create({
  // Add your styles here
  // Example:
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
	backgroundColor:"#F9F1F1"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button:{
	height:50,
	width:200,
	justifyContent: "center",
    alignItems: "center",
	color:"#F9F1F1",
	backgroundColor:"#F72C03",
	margin:40
  },
text:{
	color:"#F9F1F1",
	fontWeight:600,
	fontSize:20
}
});
