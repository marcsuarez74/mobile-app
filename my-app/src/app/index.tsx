import { Redirect } from 'expo-router'
import { useAuth } from '@/lib/auth-context'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function Index() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  if (user) {
    return <Redirect href="/(app)/home" />
  }

  return <Redirect href="/(auth)/login" />
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
