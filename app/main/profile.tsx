import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function Profile() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const goToLogin = () => {
    router.replace('/(auth)/login')
  }

  // 🔥 Cargar información del usuario
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/(auth)/login')
        return
      }

      const user = session.user

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.log("⚠️ Error cargando perfil:", error.message)
      } else {
        setProfile({
          email: user.email,
          username: profileData?.username || "Sin nombre",
        })
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando perfil...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goToLogin}>
        <Feather name="arrow-left" size={28} color="#e7c022" />
      </TouchableOpacity>

      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.subtitle}>Aquí puedes ver tu información personal.</Text>

      {profile ? (
        <View style={styles.card}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{profile.email}</Text>

          <Text style={styles.label}>Usuario</Text>
          <Text style={styles.value}>{profile.username}</Text>
        </View>
      ) : (
        <Text style={{ color: "red" }}>No se pudo cargar el perfil</Text>
      )}
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
  loading: {
    color: "white",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 25,
    width: "100%",
    maxWidth: 350,
    shadowColor: "#e7c022",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    color: "#e7c022",
    fontSize: 14,
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "600",
  },
  value: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
})
