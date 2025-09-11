import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Create() {
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [people, setPeople] = useState('')

  // Simulación de selección de imagen
  const handlePickImage = () => {
    setImage('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80')
  }

  // Simulación de publicación
  const handlePublish = () => {
    setDescription('')
    setImage(null)
    setDate('')
    setPlace('')
    setPeople('')
    alert('¡Publicación simulada!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear publicación</Text>
      <Text style={styles.subtitle}>Comparte una foto con tus amigos</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <>
            <Feather name="image" size={40} color="#e7c022" />
            <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Escribe una descripción..."
        placeholderTextColor="#777"
        value={description}
        onChangeText={setDescription}
        multiline
        maxLength={2200}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha (ej: 2025-09-11)"
        placeholderTextColor="#777"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Lugar (opcional)"
        placeholderTextColor="#777"
        value={place}
        onChangeText={setPlace}
      />

      <TextInput
        style={styles.input}
        placeholder="Personas (separa por comas)"
        placeholderTextColor="#777"
        value={people}
        onChangeText={setPeople}
      />

      <TouchableOpacity
        style={[
          styles.publishButton,
          !(image && description) && { opacity: 0.5 }
        ]}
        onPress={handlePublish}
        disabled={!(image && description)}
      >
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  imagePicker: {
    width: 180,
    height: 180,
    borderRadius: 20,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "#e7c022",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagePickerText: {
    color: "#e7c022",
    marginTop: 8,
    fontSize: 14,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 18,
  },
  input: {
    width: "100%",
    minHeight: 45,
    backgroundColor: "#111",
    color: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#222",
    textAlignVertical: "top",
  },
  publishButton: {
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
  publishButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
})