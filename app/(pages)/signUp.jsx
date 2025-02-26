import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useState } from 'react'
import { Link } from 'expo-router'
import { createUser } from '../api';
import { storeData } from "../localStorage"
import { setContext } from "../../context/userContext"

function SignUp() {
    const { setIsLogged, setUser } = setContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        let newErrors = {}

        if (!formData.name) newErrors.name = 'নাম আবশ্যক'
        if (!formData.email) newErrors.email = 'ইমেইল আবশ্যক'
        if (!formData.number) newErrors.number = 'ফোন নম্বর আবশ্যক'
        if (!formData.address) newErrors.address = 'ঠিকানা আবশ্যক'
        if (!formData.password) newErrors.password = 'পাসওয়ার্ড আবশ্যক'
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const router = useRouter();
    const handleSubmit = async () => {
        if (validateForm()) {
            const { confirmPassword, ...dataWithoutConfirmPassword } = formData;
            try {
                const response = await createUser(dataWithoutConfirmPassword);
                if (!response) {
                    Alert.alert('Error', 'Failed to create account');
                    return;
                }
                await storeData(response)
                setUser(response)
                setIsLogged(true);
                Alert.alert('Success', 'Account created successfully');
                router.replace('/');
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            })
        }
    }

    return (
        <View style={{ flex: 1 }} className='bg-blue-50 ' >
            <StatusBar
                backgroundColor="#0984e3" // Set background color
                barStyle="light-content" // Set text color (light-content for dark text, dark-content for light text) 
                hidden={false} // Show or hide the status bar (true to hide)
                translucent={false} // Set to true for semi-transparent status bar 
            />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                <View className="flex-1 bg-[#0984e3]">
                    <View className="mb-8  p-6 ">
                        <Text className="text-3xl font-bold text-white font-rubik-bold">অ্যাকাউন্ট তৈরি করুন</Text>
                        <Text className="text-gray-50 mt-2">আজই আমাদের সঙ্গে যুক্ত হোন!</Text>
                    </View>
                    <View className="space-y-4 bg-gray-50 rounded-t-2xl p-6">
                        <View className='mb-4'>
                            <Text className="text-gray-700 mb-1">পুরো নাম</Text>
                            <TextInput
                                className={`p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="আপনার পুরো নাম লিখুন"
                                value={formData.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                            {errors.name && <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>}
                        </View>

                        <View className='mb-4'>
                            <Text className="text-gray-700 mb-1">ইমেইল</Text>
                            <TextInput
                                className={`p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="আপনার ইমেইল লিখুন"
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                            {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>}
                        </View>

                        <View className='mb-4'>
                            <Text className="text-gray-700 mb-1">ফোন নম্বর</Text>
                            <TextInput
                                className={`p-3 border rounded-lg ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="+1 234 567 890"
                                keyboardType="phone-pad"
                                value={formData.number}
                                onChangeText={(text) => handleInputChange('number', text)}
                            />
                            {errors.number && <Text className="text-red-500 text-sm mt-1">{errors.number}</Text>}
                        </View>

                        <View className='mb-4'>
                            <Text className="text-gray-700 mb-1">ঠিকানা</Text>
                            <TextInput
                                className={`p-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="রাস্তা, শহর, দেশ"
                                multiline
                                value={formData.address}
                                onChangeText={(text) => handleInputChange('address', text)}
                            />
                            {errors.address && <Text className="text-red-500 text-sm mt-1">{errors.address}</Text>}
                        </View>

                        <View className='mb-4'>
                            <Text className="text-gray-700 mb-1">পাসওয়ার্ড</Text>
                            <TextInput
                                className={`p-3 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="••••••••"
                                secureTextEntry
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                            />
                            {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>}
                        </View>

                        <View className='mb-4'>
                            <Text className="text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</Text>
                            <TextInput
                                className={`p-3 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="••••••••"
                                secureTextEntry
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                            />
                            {errors.confirmPassword &&
                                <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>}
                        </View>

                        <TouchableOpacity
                            className="bg-blue-500 p-4 rounded-lg mt-6"
                            onPress={handleSubmit}
                        >
                            <Text className="text-white text-center font-bold">সাইন আপ</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-gray-600">আপনার কি ইতিমধ্যেই অ্যাকাউন্ট আছে? </Text>
                            <Link href="/profile" className="text-blue-500 font-bold">
                                <Text className="text-blue-500 font-bold">লগইন</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

export default SignUp
