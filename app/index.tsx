import { Redirect } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return ( <Redirect href="/(auth)/login"/>
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: "#000",
  //       justifyContent: "center",
  //       padding: 25,
  //     }}
  //   >
  //     {/* Encabezado */}
  //     <View style={{ alignItems: "center", marginBottom: 40 }}>
  //       <Text
  //         style={{
  //           color: "white",
  //           fontSize: 34,
  //           fontWeight: "bold",
  //           textAlign: "center",
  //           letterSpacing: 1,
  //         }}
  //       >
  //         ASSOCIATES
  //       </Text>
  //       <Text
  //         style={{
  //           color: "#aaa",
  //           fontSize: 15,
  //           textAlign: "center",
  //           marginTop: 6,
  //         }}
  //       >
  //         Log in to continue to Associates App
  //       </Text>
  //     </View>

  //     {/* Input Email */}
  //     <TextInput
  //       placeholder="Email"
  //       placeholderTextColor="#777"
  //       value={email}
  //       onChangeText={setEmail}
  //       style={{
  //         width: "100%",
  //         backgroundColor: "#111",
  //         color: "white",
  //         padding: 16,
  //         borderRadius: 14,
  //         marginBottom: 15,
  //         fontSize: 16,
  //         borderWidth: 1,
  //         borderColor: "#222",
  //         shadowColor: "#000",
  //         shadowOpacity: 0.3,
  //         shadowOffset: { width: 0, height: 2 },
  //         shadowRadius: 4,
  //       }}
  //     />

  //     {/* Input Password */}
  //     <TextInput
  //       placeholder="Password"
  //       placeholderTextColor="#777"
  //       secureTextEntry
  //       value={password}
  //       onChangeText={setPassword}
  //       style={{
  //         width: "100%",
  //         backgroundColor: "#111",
  //         color: "white",
  //         padding: 16,
  //         borderRadius: 14,
  //         marginBottom: 10,
  //         fontSize: 16,
  //         borderWidth: 1,
  //         borderColor: "#222",
  //         shadowColor: "#000",
  //         shadowOpacity: 0.3,
  //         shadowOffset: { width: 0, height: 2 },
  //         shadowRadius: 4,
  //       }}
  //     />

  //     {/* Olvidé contraseña */}
  //     <TouchableOpacity style={{ marginBottom: 25, alignSelf: "flex-end" }}>
  //       <Text
  //         style={{
  //           color: "#e7c022",
  //           fontSize: 14,
  //           fontWeight: "600",
  //         }}
  //       >
  //         Forgot Password?
  //       </Text>
  //     </TouchableOpacity>

  //     {/* Botón Login */}
  //     <TouchableOpacity
  //       style={{
  //         width: "100%",
  //         backgroundColor: "#e7c022",
  //         padding: 18,
  //         borderRadius: 15,
  //         alignItems: "center",
  //         marginBottom: 20,
  //         shadowColor: "#e7c022",
  //         shadowOpacity: 0.5,
  //         shadowOffset: { width: 0, height: 4 },
  //         shadowRadius: 8,
  //       }}
  //     >
  //       <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
  //         Log In
  //       </Text>
  //     </TouchableOpacity>

  //     {/* Divider */}
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         alignItems: "center",
  //         marginVertical: 15,
  //       }}
  //     >
  //       <View style={{ flex: 1, height: 1, backgroundColor: "#222" }} />
  //       <Text style={{ color: "#777", marginHorizontal: 10 }}>OR</Text>
  //       <View style={{ flex: 1, height: 1, backgroundColor: "#222" }} />
  //     </View>

  //     {/* Crear cuenta */}
  //     <TouchableOpacity
  //       style={{
  //         width: "100%",
  //         borderWidth: 2,
  //         borderColor: "#e7c022",
  //         padding: 16,
  //         borderRadius: 15,
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: "#e7c022",
  //           fontSize: 17,
  //           fontWeight: "bold",
  //         }}
  //       >
  //         Create Account
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  );
}
