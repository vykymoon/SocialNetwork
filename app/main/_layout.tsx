import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import NavBar from './NavBar';

export default function Layout() {
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
});