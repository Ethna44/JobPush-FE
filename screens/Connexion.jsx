import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";

export default function StackScreen2({ navigation }) {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Connexion</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            focusedField === 'email' && styles.inputFocused
          ]}
          placeholder="email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === 'password' && styles.inputFocused
          ]}
          placeholder="mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
        />
        {/* <TextInput
          style={[
            styles.input,
            focusedField === 'confirm' && styles.inputFocused
          ]}
          placeholder="confirmer mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          onFocus={() => setFocusedField('confirm')}
          onBlur={() => setFocusedField(null)}
        /> */}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.button}>
        <Text style={styles.buttonText}>LET'S GO !</Text>
      </TouchableOpacity>
      <View>
        <Text>Vous n'avez pas de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Accueil")} style={styles.buttonGoBack}>
          <Text style={styles.buttonGoBackText}>Inscrivez-vous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.background
  },
  title: AppStyles.title,
  input: AppStyles.input,
  inputFocused : AppStyles.inputFocused,
  button : AppStyles.button,
  buttonText : AppStyles.buttonText
});
