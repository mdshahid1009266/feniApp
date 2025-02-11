import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo Vector Icons

const InfoPage = () => {
    return (
        <ScrollView className="flex-1 bg-blue-50 px-4 py-6">
            <View className="mb-4 flex flex-row items-center">
                <Ionicons name="information-circle-outline" size={32} color="#3B82F6" />
                <Text className="ml-2 text-2xl font-bold text-primary-500">
                    App Information
                </Text>
            </View>
            <View className="mb-6">
                <Text className="text-lg font-semibold">App Version</Text>
                <Text className="text-gray-700">1.0.0</Text>
            </View>
            <View className="mb-6">
                <Text className="text-lg font-semibold">Status</Text>
                <Text className="text-gray-700">Beta Testing</Text>
            </View>
            <View className="mb-6">
                <Text className="text-lg font-semibold">Release Notes</Text>
                <Text className="text-gray-700">
                    - Initial release of FeniCity App{'\n'}
                    - Explore educational, cultural, and traditional content.
                </Text>
            </View>
        </ScrollView>
    );
};

export default InfoPage;
