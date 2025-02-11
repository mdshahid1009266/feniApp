import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Linking, View, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';

// Replace with the actual phone number (including country code) and desired message.
const PHONE_NUMBER = '01891614300';
const PRE_FILLED_MESSAGE = 'Hello, I would like to inquire about your services.';

export default function App() {
    const handleWhatsAppContact = async () => {
        const url = `whatsapp://send?phone=+88${PHONE_NUMBER}&text=${encodeURIComponent(PRE_FILLED_MESSAGE)}`;
        // Check if WhatsApp can be opened
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('WhatsApp is not available on this device');
        }
    };
    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../assets/fonts/SolaimanLipi.ttf"),
    });
    return (
        <SafeAreaView className="flex-1 bg-blue-100">
            <Image
                source={{ uri: 'https://www.hearthstoneridge.com/wp-content/uploads/2017/09/travel-options.jpg' }}
                style={{ width: '100%', height: 200, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
            />
            <View className="p-4 mt-6">
                <Text className="text-3xl text-gray-800 text-center font-[BanglaFont]">
                    ফেনীতে আমরাই দিচ্ছি সবচেয়ে কম দামে টিকিট।
                </Text>
                <Text className="text-xl text-gray-700 text-center mt-4 font-[BanglaFont]">
                    সবচেয়ে কম দামে ক সকল প্রকার ভিসা প্রসেসিং,{'\n'}
                    পাসর্পোর্ট টিকিট সহ যাবতীয় সেবা পেতে
                </Text>

                {/* Contact Button */}
                <TouchableOpacity
                    onPress={handleWhatsAppContact}
                    className="mt-6 justify-center items-center flex-row text-center bg-green-500 px-4 py-2 rounded-full"
                >
                    <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
                    <Text className="text-white text-lg font-semibold ml-2 text-center font-[BanglaFont]">যোগাযোগ করুন</Text>
                </TouchableOpacity>

                <Text className="text-md text-gray-600 mt-6 text-center font-[BanglaFont]">
                    অথবা সরাসরি আমাদের অফিসে আসুন।{'\n'}
                    ঠিকানা:
                </Text>
            </View>
        </SafeAreaView>
    );
}
