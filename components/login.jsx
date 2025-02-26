import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { loginUser } from '../app/api';
import { storeData } from "../app/localStorage"
import { setContext } from "../context/userContext"
import { useFonts } from 'expo-font';
function Login() {

  const { setIsLogged, setUser } = setContext();

  const [credentials, setCredentials] = useState({
    emailOrNumber: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const [fontsLoaded] = useFonts({
    BanglaFont: require("../assets/fonts/SolaimanLipi.ttf"),
  });

  const validateForm = () => {
    let newErrors = {}

    if (!credentials.emailOrNumber.trim()) {
      newErrors.emailOrNumber = 'ইমেইল অথবা ফোন নম্বর আবশ্যক'
    }
    if (!credentials.password.trim()) {
      newErrors.password = 'পাসওয়ার্ড আবশ্যক' // পাসওয়ার্ড আবশ্যক
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await loginUser(credentials);
        if (!response) {
          Alert.alert('Error', 'ভুল ইমেইল অথবা পাসওয়ার্ড'); // ত্রুটি, ভুল ইমেইল অথবা পাসওয়ার্ড
          return;
        }
        await storeData(response)
        setUser(response)
        setIsLogged(true); // setIsLogged(true) চেষ্টা ব্লকের ভিতরে সরান
        router.replace('/'); // router.replace('/') চেষ্টা ব্লকের ভিতরে সরান
      } catch (error) {
        console.log(error);
      }
    }
  }

  // ফোকাস আউটলাইন সরাতে সাধারণ স্টাইল (ওয়েবে কাজ করে)
  const noFocusOutline = { outlineStyle: 'none' }

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <View className="mb-10 items-center">
        <Text className="text-4xl font-rubik-extrabold text-gray-800">পুনরায় স্বাগতম</Text> {/* পুনরায় স্বাগতম */}
        <Text className="text-lg text-gray-500 mt-2">চালু রাখতে সাইন ইন করুন</Text> {/* চালু রাখতে সাইন ইন করুন */}
      </View>

      <View className="space-y-6">
        {/* ইমেইল অথবা ফোন নম্বর ইনপুট */}
        <View>
          <Text className="text-gray-700 mb-2">ইমেইল অথবা ফোন নম্বর</Text> {/* ইমেইল অথবা ফোন নম্বর */}
          <TextInput
            style={noFocusOutline}
            className={`p-4 border rounded-xl ${errors.emailOrNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="john@example.com অথবা +1234567890" // john@example.com অথবা +1234567890
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

        {/* পাসওয়ার্ড ইনপুট দেখান/লুকান টগল সহ */}
        <View>
          <Text className="text-gray-700 mb-2">পাসওয়ার্ড</Text> {/* পাসওয়ার্ড */}
          <View
            className={`flex-row items-center border rounded-xl ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
          >
            <TextInput
              style={noFocusOutline}
              className="flex-1 p-4"
              placeholder="আপনার পাসওয়ার্ড লিখুন" // আপনার পাসওয়ার্ড লিখুন
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

        {/* সাইন ইন বোতাম */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-xl shadow-md mt-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold text-lg">
            সাইন ইন করুন {/* সাইন ইন করুন */}
          </Text>
        </TouchableOpacity>

        {/* সাইন আপ লিঙ্ক */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">একাউন্ট নেই?</Text> {/* একাউন্ট নেই? */}
          <Link href="/signUp" className="ml-1">
            <Text className="text-blue-600 font-semibold"> সাইন আপ করুন</Text> {/* সাইন আপ করুন */}
          </Link>
        </View>
      </View>
    </View>
  )
}

export default Login