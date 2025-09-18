import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function CreateAccount() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("Por favor llena todos los campos")
      return
    }

    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError("Error creando cuenta: " + error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Crear perfil en tabla profiles
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username,
      })

      if (profileError) {
        // 👇 ya no mostramos error si se guarda igual en la base
        console.log("⚠️ Error guardando perfil (pero continuamos):", profileError.message)
      }

      // Resetear campos
      setEmail('')
      setUsername('')
      setPassword('')

      // 🚀 Ir directo al login
      router.replace('/(auth)/login')
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(auth)/login')}>
        <Feather name="arrow-left" size={28} color="#e7c022" />
      </TouchableOpacity>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Únete a Associates</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#777"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.registerButton, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </Text>
      </TouchableOpacity>

      {/* ❌ Quitamos el mensaje de error en pantalla para el caso del perfil */}
      {error ? <Text style={{ color: "red", marginTop: 12 }}>{error}</Text> : null}
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
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#111",
    color: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#e7c022",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#e7c022",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  registerButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
})
