import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // https://oblador.github.io/react-native-vector-icons/#FontAwesome
import Accueil from "./screens/Accueil";
import Inscription from "./screens/Inscription";
import Connexion from "./screens/Connexion";
import Offres from "./screens/Offres";
import Candidatures from "./screens/Candidatures";
import Category from "./screens/Category";
import Compte from "./screens/Compte";
import Header from "./components/Header";
import SubAstuces from "./screens/SubAstuces";
import Profil from "./screens/Profil";
import Alerte from "./screens/Alerte";
import OfferDetails from "./screens/OfferDetails";
import Recherche from "./screens/Recherche";
import ArticleDetails from "./screens/ArticleDetails";
import AccountSettings from "./screens/AccountSettings";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // Persistor
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage
import user from "./reducers/user";

import {
  useFonts,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Composant personnalisé pour le bouton central surélevé
const CustomTabBarButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={styles.customTabBarButton}
      activeOpacity={0.8}
    >
      <View style={styles.customTabBarButtonInner}>
        <FontAwesome name="plus" size={35} color="#F9F1F1" />
      </View>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      safeAreaInsets={{
        bottom:
          Platform.OS === "android"
            ? Math.max(insets.bottom, 20)
            : insets.bottom,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Offres":
              return (
                <FontAwesome
                  name={"location-arrow"}
                  size={size}
                  color={color}
                />
              );
            case "Candidatures":
              return (
                <FontAwesome name={"file-text-o"} size={size} color={color} />
              );
            case "Astuces":
              return (
                <FontAwesome name={"lightbulb-o"} size={size} color={color} />
              );
            case "Compte":
              return (
                <FontAwesome name={"user-circle"} size={size} color={color} />
              );
            case "Recherche":
              return (
                <FontAwesome name={"plus-circle"} size={size} color={color} />
              );
          }
        },
        tabBarActiveTintColor: "#F72C03",
        tabBarInactiveTintColor: "#F9F1F1",
        tabBarStyle: {
          backgroundColor: "#2B3033",
          borderTopWidth: 0,
          paddingBottom:
            Platform.OS === "android"
              ? Math.max(insets.bottom, 10)
              : insets.bottom,
          paddingTop: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Offres" component={Offres} />
      <Tab.Screen name="Candidatures" component={Candidatures} />
      <Tab.Screen
        name="Recherche"
        component={Recherche}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, size }) => null, // On supprime l'icône par défaut car nous utilisons un bouton personnalisé
        }}
      />
      <Tab.Screen name="Astuces" component={Category} />
      <Tab.Screen name="Compte" component={Compte} />
    </Tab.Navigator>
  );
};

// Styles pour notre bouton personnalisé
const styles = StyleSheet.create({
  customTabBarButton: {
    top: -26, // Pour surélever le bouton au-dessus de la barre de navigation
    justifyContent: "center",
    alignItems: "center",
  },
  customTabBarButtonInner: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: "#F72C03", // Même couleur que tabBarActiveTintColor
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3033",
    borderWidth: 10,
  },
});

// Redux Persist Configuration
const persistedReducers = persistReducer(
  {
    key: "Jobpush",
    storage: AsyncStorage,
    blacklist: [], // Add reducers that you don't want to persist
    whitelist: ["user"], // Add reducers that you want to persist
  },
  combineReducers({ user })
);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
// persistor.purge();  

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Header />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Accueil" component={Accueil} />
              <Stack.Screen name="Inscription" component={Inscription} />
              <Stack.Screen name="Connexion" component={Connexion} />
              <Stack.Screen name="Profil" component={Profil} />
              <Stack.Screen name="Alerte" component={Alerte} />
              <Stack.Screen name="Annonce" component={OfferDetails} />
              <Stack.Screen
                name="ParametresCompte"
                component={AccountSettings}
              />
              <Stack.Screen name="SubAstuces" component={SubAstuces} />
              <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar hidden={true} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
