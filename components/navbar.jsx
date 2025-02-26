import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Expo Vector Icons
import { Link } from 'expo-router';

const Navbar = () => {
    const navigation = useNavigation(); // Get navigation object

    return (
        <View className="flex flex-row items-center justify-between bg-black px-4 py-3 shadow-md">
            {/* Drawer Menu Button */}
            <Pressable onPress={() => navigation.openDrawer()} className="p-2">
                <Ionicons name="menu" size={24} color="#fff" />
            </Pressable>

            {/* App Name */}
            <Text className="text-lg font-bold text-white">
                Upokar
            </Text>

            {/* Info Icon */}
            <Link href="/InfoPage" className="">
                <Ionicons name="information-circle-outline" size={32} color="#fff" />
            </Link>
        </View>
    );
};

export default Navbar;
