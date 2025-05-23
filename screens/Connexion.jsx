import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { updateToken } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";

export default function LogIn({ navigation }) {
  const dispatch = useDispatch();
  const [focusedField, setFocusedField] = useState(null);
  const [email, setEmail] = useState("");
  const [checkMail, setCheckMail] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const handleRegister = () => {
    fetch(`${EXPO_IP}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
          return;
        }
        dispatch(updateToken(data.token));
        navigation.navigate("TabNavigator");
      });
  };
  console.log(email);
  console.log(password);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logoJobPush-Photoroom.jpg")}
        ></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Connexion</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            focusedField === "email" && styles.inputFocused,
          ]}
          placeholder="email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <TextInput
          style={[
            styles.input,
            focusedField === "password" && styles.inputFocused,
          ]}
          placeholder="mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />

        {errorMessage && (
          <Text style={{ color: "red", marginTop: 4 }}>{errorMessage}</Text>
        )}
      </View>
      <View style={styles.buttonAndTextContainer}>
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>LET'S GO !</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.body}>Vous n'avez pas de compte ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Inscription")}
            style={styles.link}
          >
            <Text style={styles.linkText}>Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderRadius: 10,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
    marginBottom: 30,
  },
  title: AppStyles.title,
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
    margin: 30,
  },
  input: AppStyles.input,
  inputFocused: AppStyles.inputFocused,
  buttonAndTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
  link: AppStyles.link,
  body: AppStyles.body,
  linkText: AppStyles.linkText,
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    // borderColor: "blue",
    // borderWidth: 1,
  },
});
