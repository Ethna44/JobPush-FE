import { StyleSheet, Text, View, Button } from "react-native";
import React from 'react'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={{color:'#F9F1F1',fontSize:24}}>Job<Text style={{color:'#F72C03'}}>Push</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    // Add your styles here
    // Example:
    header: {
        height:'8%',
        width:"100%",
        backgroundColor:'#2B3033',
        justifyContent:'center',
        alignItems:'center',
      
    },

});
