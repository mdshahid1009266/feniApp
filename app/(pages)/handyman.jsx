import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function MistriLagbeScreen() {
    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../assets/fonts/SolaimanLipi.ttf"),
    });

    // Use a single object to hold all form values
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        type: '',
        description: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        const { name, phone, location, type, description } = formData;

        // Check if all fields are filled
        if (!name || !phone || !location || !type || !description) {
            Alert.alert('Missing Information', 'Please fill all required fields.');
            return;
        }

        // Log the data if everything is filled correctly
        console.log(formData);

        // Handle submission logic here (e.g., API call)
        Alert.alert('Submitted', 'Your request has been submitted.');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#dbeafe]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 20 }}>

                    {/* Name Input */}
                    <Text className="text-gray-700 mb-2 text-xl font-[BanglaFont]">আপনার নাম</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-4 font-[BanglaFont]"
                        placeholder="আপনার নাম লিখুন"
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />

                    {/* Phone Number Input */}
                    <Text className="text-gray-700 mb-2 font-[BanglaFont] text-xl">ফোন নাম্বার</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-4 font-[BanglaFont]"
                        placeholder="ফোন নাম্বার লিখুন"
                        value={formData.phone}
                        onChangeText={(value) => handleInputChange('phone', value)}
                        keyboardType="phone-pad"
                    />

                    {/* Location Input */}
                    <Text className="text-gray-700 mb-2 font-[BanglaFont] text-xl">অবস্থান</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-4 font-[BanglaFont]"
                        placeholder="অবস্থান লিখুন"
                        value={formData.location}
                        onChangeText={(value) => handleInputChange('location', value)}
                    />

                    {/* Type of Service Input */}
                    <Text className="text-gray-700 mb-2 text-xl font-[BanglaFont]">সেবার ধরন</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-6 font-[BanglaFont]"
                        placeholder="যেমন: ইলেকট্রিশিয়ান, প্লাম্বার"
                        value={formData.type}
                        onChangeText={(value) => handleInputChange('type', value)}
                    />

                    {/* Description Input */}
                    <Text className="text-gray-700 mb-2 text-xl font-[BanglaFont]">বিস্তারিত</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-6 font-[BanglaFont]"
                        placeholder="আপনার প্রয়োজন বিস্তারিত লিখুন"
                        value={formData.description}
                        onChangeText={(value) => handleInputChange('description', value)}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                    {/* Submit Button */}
                    <TouchableOpacity
                        className="bg-blue-600 rounded-md p-4 flex-row items-center justify-center font-[BanglaFont]"
                        onPress={handleSubmit}
                    >
                        <MaterialIcons name="send" size={24} color="#fff" />
                        <Text className="text-white text-lg font-semibold ml-2 font-[BanglaFont]">পাঠান</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
