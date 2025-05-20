import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // https://oblador.github.io/react-native-vector-icons/#FontAwesome
import Acceuil from "./screens/Acceuil";
import Inscription from "./screens/Inscription";
import Connexion from "./screens/Connexion";
import Offre from "./screens/Offre";
import Candidatures from "./screens/Candidatures";
import Astuces from "./screens/Astuces";
import Compte from "./screens/Compte";
import Header from "./components/Header";
import Profil from "./screens/Profil";
import Alerte from "./screens/Alerte";
import Recherche from "./screens/Recherche";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // Persistor
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage
import user from "./reducers/user";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Offre":
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
        tabBarInactiveTintColor: "F9F1F1",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Offre" component={Offre} />
      <Tab.Screen name="Candidatures" component={Candidatures} />
      <Tab.Screen name="Recherche" component={Recherche} />
      <Tab.Screen name="Astuces" component={Astuces} />
      <Tab.Screen name="Compte" component={Compte} />
    </Tab.Navigator>
  );
};

// Redux Persist Configuration
const persistedReducers = persistReducer(
  {
    key: "Jobpush",
    storage: AsyncStorage,
    blacklist: ["user"], // Add reducers that you don't want to persist
    whitelist: [], // Add reducers that you want to persist
  },
  combineReducers({ user })
);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Acceuil" component={Acceuil} />
            <Stack.Screen name="Inscription" component={Inscription} />
            <Stack.Screen name="Connexion" component={Connexion} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Alerte" component={Alerte} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar hidden={true} />
      </PersistGate>
    </Provider>
  );
}
