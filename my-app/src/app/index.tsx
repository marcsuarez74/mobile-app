import { Redirect } from 'expo-router'
import { useAuth } from '@/lib/auth-context'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

export default function Index() {
  const { user, loading } = useAuth()

  console.log('Index render - loading:', loading, 'user:', user?.email)

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.text}>Chargement...</Text>
      </View>
    )
  }

  if (user) {
    console.log('Redirecting to home')
    return <Redirect href="/(app)/home" />
  }

  console.log('Redirecting to login')
  return <Redirect href="/(auth)/login" />
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 16,
    color: '#6b7280',
  },
})
