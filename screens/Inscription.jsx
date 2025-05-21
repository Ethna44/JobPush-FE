import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { updateEmail } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";

export default function StackScreen2({ navigation }) {
  const [focusedField, setFocusedField] = useState(null);

  const [email, setEmail] = useState("");
  const [checkMail, setCheckMail] = useState(false);
  const [password,setCheckPassword] = useState ('')
  const [passwordConfirm,setPasswordConfirm] = useState ('')
  const [errorMessage,setErrorMessage] = useState ('')

  const user = useSelector(state => state.user.profile.email);
  const dispatch = useDispatch();

 function handleSubmit() {
    if (validateEmail(email)) {
      setCheckMail(false);
      dispatch(updateEmail(email));
      
    } else {
      setCheckMail(true);
    }
    
  }

  function validateEmail(email) {
    var emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );
    return emailReg.test(email);
  }

    const handleRegister = () => {

        handleSubmit(); // vérifie l'email et fait le dispatch

  if (checkMail) {
    return; // stoppe ici si l'email est invalide
  }
   
      fetch("http://192.168.100.250:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email  ,
        password: password,
        confirmPassword: passwordConfirm,
      }),
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.result) {
          console.log(data)
          setCheckMail("");
          setCheckPassword("");
          setPasswordConfirm("");
        navigation.navigate("Profil");
        }
        if (!data.result){
          console.log("Erreur reçue :", data.error);
           setErrorMessage(data.error || "An error occurred. Please try again.");
           console.log("errorMessage (état local) :", errorMessage);
            
        }
        setErrorMessage('')
      });
  };


  
  console.log(user);

  
  console.log(checkMail);
  console.log(email);
  console.log(password)
  console.log(passwordConfirm)
  

  return (
    <SafeAreaView style={styles.container}>
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
                 onChangeText={(value) => setEmail(value)}
            value={email}
              />
                {checkMail && (
            <Text style={{ color: "red", marginTop: 4 }}>
              Invalid email address
            </Text>
          )}
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
                  onChangeText={(value) => setCheckPassword(value)}
            value={password}
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
                    onChangeText={(value) => setPasswordConfirm(value)}
            value={passwordConfirm}

              
                
              />

            {errorMessage !=="" && (
            <Text style={{ color: "red", marginTop: 4 }}>
              {errorMessage}
            </Text>
          )}
            </View>
            <View style={styles.buttonAndTextContainer}>
              <TouchableOpacity onPress={() => {
              handleRegister()
            }} style={styles.button}>
                <Text style={styles.buttonText}>LET'S GO !</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.body}>Vous avez déjà un compte ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Connexion")} style={styles.link}>
                  <Text style={styles.linkText}>Connectez-vous</Text>
                </TouchableOpacity>
              </View>
            </View>
    </SafeAreaView>
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
