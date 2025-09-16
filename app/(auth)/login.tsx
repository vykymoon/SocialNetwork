import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError("Por favor ingresa email y contraseña")
            return
        }

        setLoading(true)
        setError('')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        setLoading(false)

        if (error) {
            if (error.message.includes("Invalid login credentials")) {
                setError("Usuario o contraseña incorrectos")
            } else {
                setError("Ocurrió un error: " + error.message)
            }
        } else if (data?.user) {
            // Solo navega si hay usuario válido
            router.replace('/main')
        } else {
            setError("No se pudo iniciar sesión. Intenta de nuevo.")
        }
    }

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>ASSOCIATES</Text>
                <Text style={styles.headerSubtitle}>
                    Log in to continue to Associates App
                </Text>
            </View>

            {/* Input Email */}
            <TextInput
                placeholder="Email"
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            {/* Input Password */}
            <TextInput
                placeholder="Password"
                placeholderTextColor="#777"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            {/* Olvidé contraseña */}
            <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Botón Login */}
            <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.loginButtonText}>
                    {loading ? "Cargando..." : "Log In"}
                </Text>
            </TouchableOpacity>

            {/* Error */}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
            </View>

            {/* Crear cuenta */}
            <Link href="/createaccount" asChild>
                <TouchableOpacity style={styles.createAccountButton}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 25,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    headerTitle: {
        color: "white",
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 1,
    },
    headerSubtitle: {
        color: "#aaa",
        fontSize: 15,
        textAlign: "center",
        marginTop: 6,
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
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    forgotContainer: {
        marginBottom: 25,
        alignSelf: "flex-end",
    },
    forgotText: {
        color: "#e7c022",
        fontSize: 14,
        fontWeight: "600",
    },
    loginButton: {
        width: "100%",
        backgroundColor: "#e7c022",
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#e7c022",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    loginButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    error: {
        color: 'red',
        marginTop: 12,
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#222",
    },
    dividerText: {
        color: "#777",
        marginHorizontal: 10,
    },
    createAccountButton: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#e7c022",
        padding: 16,
        borderRadius: 15,
        alignItems: "center",
    },
    createAccountText: {
        color: "#e7c022",
        fontSize: 17,
        fontWeight: "bold",
    },
})
