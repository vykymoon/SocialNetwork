import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const router = useRouter()

  const goToLogin = () => {
    router.replace('/(auth)/login')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goToLogin}>
        <Feather name="arrow-left" size={28} color="#e7c022" />
      </TouchableOpacity>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.subtitle}>Aquí puedes ver y editar tu información personal.</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 40,
  },
})
