import { Feather, Ionicons } from '@expo/vector-icons'
import { Link, usePathname } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function NavBar() {
  const pathname = usePathname()

  return (
    <View style={styles.navBar}>
      <Link href="/main" asChild>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={28} color="#e7c022" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/main/chat" asChild>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chatbubble-outline" size={28} color="#e7c022" />
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/main/create" asChild>
        <TouchableOpacity style={styles.plusButton}>
          <Feather name="plus-circle" size={40} color="#e7c022" />
        </TouchableOpacity>
      </Link>
      <Link href="/main/reels" asChild>
        <TouchableOpacity style={styles.navButton}>
          <Feather name="film" size={28} color="#e7c022" />
          <Text style={styles.navLabel}>Reels</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/main/profile" asChild>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-circle-outline" size={28} color="#e7c022" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20, // Espacio para la línea interactiva
    height: 70,
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingHorizontal: 10,
    paddingTop: 12,
    zIndex: 100,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    color: '#e7c022',
    fontSize: 12,
    marginTop: 2,
  },
  plusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
})