import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";

export default function StackScreen2({ navigation }) {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={require('../assets/logoJobPush-Photoroom.jpg')}></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inscription</Text>
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
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'confirm' && styles.inputFocused
                ]}
                placeholder="confirmer mot de passe"
                placeholderTextColor="#999"
                secureTextEntry
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            <View style={styles.buttonAndTextContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.button}>
                <Text style={styles.buttonText}>LET'S GO !</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.body}>Vous avez déjà un compte ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Connexion")} style={styles.link}>
                  <Text style={styles.linkText}>Connectez-vous</Text>
                </TouchableOpacity>
              </View>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: AppStyles.color.background,
      // borderColor: "red",
      // borderWidth: 1,
    },
    logo: {
      width: 100,
      height: 100,
      margin: 10,
    },
    titleContainer : {
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      // borderColor: "blue",
      // borderWidth: 1,
      marginBottom: 30,
    },
    title: AppStyles.title,
    inputContainer : {
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      // borderColor: "blue",
      // borderWidth: 1,
      margin: 30
    },
    input: AppStyles.input,
    inputFocused : AppStyles.inputFocused,
    buttonAndTextContainer : {
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      // borderColor: "blue",
      // borderWidth: 1,
    },
    button : AppStyles.button,
    buttonText : AppStyles.buttonText,
    link: AppStyles.link,
    body : AppStyles.body,
    linkText: AppStyles.linkText,
    textContainer : {
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      flexDirection: "row",
      marginTop: 10
      // borderColor: "blue",
      // borderWidth: 1,
    },
});
