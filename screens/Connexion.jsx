import { StyleSheet, Text, View, Button } from "react-native";

export default function StackScreen2({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <Button title="Acceuil" onPress={() => navigation.navigate("Acceuil")} />
            <Button title="Page principale" onPress={() => navigation.navigate("Profil")} />
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
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
