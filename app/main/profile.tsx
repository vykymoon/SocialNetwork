import CameraModal from '@/components/CameraModal'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function Profile() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cameraVisible, setCameraVisible] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const goToLogin = () => {
    router.replace('/(auth)/login')
  }

  useEffect(()=>{
    console.log({
      avatar
    })
  },[avatar])

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/(auth)/login')
        return
      }

      const user = session.user
      setUserId(user.id)

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.log("Error cargando perfil:", error.message)
      } else {
        setProfile({
          email: user.email,
          username: profileData?.username || "Sin nombre",
          avatar_url: profileData?.avatar_url,
        })
        
        if (profileData?.avatar_url) {
          setAvatar(profileData.avatar_url)
        }
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  const updateAvatarInDB = async (avatarUrl: string) => {
    if (!userId) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', userId)

      if (error) {
        console.error("Error actualizando avatar:", error)
        Alert.alert("Error", "No se pudo actualizar el avatar en la base de datos")
      }
    } catch (error) {
      console.error("Error actualizando avatar:", error)
    }
  }

  const handleImagePicked = async (uri: string) => {
    if (!userId) return

    try {

      await updateAvatarInDB(uri)
      setAvatar(uri)

    } catch (err) {
      console.error("Error procesando imagen:", err)
      Alert.alert("Error", "Ocurrió un problema al actualizar tu avatar")
    }
  }

  const handleSignOut = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase.auth.signOut()
            if (error) {
              Alert.alert("Error", "No se pudo cerrar sesión")
            } else {
              router.replace('/(auth)/login')
            }
          },
        },
      ]
    )
  }

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
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Feather name="user" size={40} color="#666" />
              </View>
            )}
            <TouchableOpacity 
              style={styles.cameraIconButton} 
              onPress={() => setCameraVisible(true)}
            >
              <Feather name="camera" size={16} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{profile.email}</Text>

          <Text style={styles.label}>Usuario</Text>
          <Text style={styles.value}>{profile.username}</Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setCameraVisible(true)}
          >
            <Feather name="camera" size={20} color="black" />
            <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={handleSignOut}
          >
            <Feather name="log-out" size={20} color="white" />
            <Text style={styles.signOutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ color: "red" }}>No se pudo cargar el perfil</Text>
      )}

      <CameraModal 
        visible={cameraVisible} 
        onClose={() => setCameraVisible(false)} 
        onImagePicked={handleImagePicked}
        userId={userId || undefined}
      />
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
  loading: { color: "white", fontSize: 18 },
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
    alignItems: "center",
  },
  avatarContainer: { position: "relative", marginBottom: 20 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#e7c022",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#e7c022",
  },
  cameraIconButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#e7c022",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#111",
  },
  label: {
    color: "#e7c022",
    fontSize: 14,
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "600",
  },
  value: { color: "white", fontSize: 18, marginBottom: 20 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7c022",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: { marginLeft: 8, fontWeight: "600", color: "#000" },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  signOutButtonText: { marginLeft: 8, fontWeight: "600", color: "white" },
});
