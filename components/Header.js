import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from 'react'

export default function Header() {
  return (
    <SafeAreaView style={styles.header}>
        <Text style={{color:'#F9F1F1',fontSize:24}}>Job<Text style={{color:'#F72C03'}}>Push</Text></Text>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    header: {
        height:'8%',
        width:"100%",
        backgroundColor:'#2B3033',
        justifyContent:'flex-end',
        paddingBottom: 5,
        alignItems:'center',
    },
});
