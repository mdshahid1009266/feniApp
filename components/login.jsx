import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

function Login({ navigation }) {
  const [credentials, setCredentials] = useState({
    emailOrNumber: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    let newErrors = {}

    if (!credentials.emailOrNumber.trim()) {
      newErrors.emailOrNumber = 'Email or phone number is required'
    }
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = () => {
    if (validateForm()) {
      // Add your authentication logic here
      console.log('Login credentials:', credentials)
      navigation.navigate('Home')
    }
  }

  // Common style to remove focus outline (works on web)
  const noFocusOutline = { outlineStyle: 'none' }

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <View className="mb-10 items-center">
        <Text className="text-4xl font-rubik-extrabold text-gray-800">Welcome Back</Text>
        <Text className="text-lg text-gray-500 mt-2">Sign in to continue</Text>
      </View>

      <View className="space-y-6">
        {/* Email or Phone Number Input */}
        <View>
          <Text className="text-gray-700 mb-2">Email or Phone Number</Text>
          <TextInput
            style={noFocusOutline}
            className={`p-4 border rounded-xl ${
              errors.emailOrNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com or +1234567890"
            keyboardType="email-address"
            value={credentials.emailOrNumber}
            onChangeText={(text) => {
              setCredentials({ ...credentials, emailOrNumber: text })
              if (errors.emailOrNumber) {
                setErrors((prev) => ({ ...prev, emailOrNumber: null }))
              }
            }}
          />
          {errors.emailOrNumber && (
            <Text className="text-red-500 text-sm mt-1">{errors.emailOrNumber}</Text>
          )}
        </View>

        {/* Password Input with Show/Hide Toggle */}
        <View>
          <Text className="text-gray-700 mb-2">Password</Text>
          <View
            className={`flex-row items-center border rounded-xl ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <TextInput
              style={noFocusOutline}
              className="flex-1 p-4"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={credentials.password}
              onChangeText={(text) => {
                setCredentials({ ...credentials, password: text })
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: null }))
                }
              }}
            />
            <TouchableOpacity
              className="pr-4"
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          )}
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-xl shadow-md"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account?</Text>
          <Link href="/signUp" className="ml-1">
            <Text className="text-blue-600 font-semibold"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default Login
