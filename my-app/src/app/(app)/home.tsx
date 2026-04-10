import { View, Text, TouchableOpacity } from 'react-native'
import { useAuth } from '@/lib/auth-context'
import '@/styles/global.css'

export default function HomeScreen() {
  const { user, signOut } = useAuth()

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-12 pb-4 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full bg-blue-600 justify-center items-center">
            <Text className="text-white font-bold text-lg">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text className="text-gray-800 font-medium" numberOfLines={1}>
            {user?.email}
          </Text>
        </View>
        <TouchableOpacity
          onPress={signOut}
          className="px-4 py-2 bg-red-500 rounded-lg"
        >
          <Text className="text-white font-medium">Déconnexion</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center px-8">
        <View className="bg-gray-50 rounded-2xl p-8 shadow-sm w-full max-w-sm items-center">
          <View className="w-20 h-20 rounded-full bg-green-100 justify-center items-center mb-6">
            <Text className="text-4xl">✓</Text>
          </View>
          <Text className="text-4xl font-bold text-gray-800 text-center mb-2">
            App works
          </Text>
          <Text className="text-gray-500 text-center">
            Votre application est configurée et fonctionne correctement !
          </Text>
        </View>
      </View>
    </View>
  )
}
