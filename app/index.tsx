import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000", // fondo negro
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* Título */}
      <Text
        style={{
          color: "white",
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 40,
        }}
      >
        WELCOME TO OUR SOCIAL NETWORK
      </Text>

      {/* Input Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={{
          width: "100%",
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      {/* Input Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          width: "100%",
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 25,
        }}
      />

      {/* Botón Login */}
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#e7c022ff", // naranja principal
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* Botón Signup */}
      <TouchableOpacity
        style={{
          width: "100%",
          borderWidth: 2,
          borderColor: "#e7c022ff",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#e7c022ff", fontSize: 18, fontWeight: "bold" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
