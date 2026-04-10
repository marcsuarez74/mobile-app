import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function AppLayout() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (loading) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!user && !inAuthGroup) {
      router.replace('/login')
    } else if (user && inAuthGroup) {
      router.replace('/')
    }
  }, [user, loading, segments])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
