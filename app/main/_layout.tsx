import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import NavBar from './NavBar';

export default function Layout() {
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.replace('/(auth)/login');
            }
            setChecking(false);
        };
        checkSession();
    }, []);

    if (checking) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e7c022" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});