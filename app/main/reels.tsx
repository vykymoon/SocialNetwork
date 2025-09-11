import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Reels() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reels</Text>
      <Text style={styles.subtitle}>Aquí verás los reels de la comunidad.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    paddingBottom: 80,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 40,
  },
})