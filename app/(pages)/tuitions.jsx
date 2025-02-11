import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList, TextInput, Linking, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const tuitionData = [
    {
        id: '1',
        code: 'T-7890',
        gender: 'Female',
        qualification: 'M.Sc in Physics, B.Ed',
        address: 'Mirpur 10, Dhaka',
        students: 12,
        salary: '8000 BDT',
        subjects: 'Physics, Higher Math',
        daysPerWeek: 6
    },
    {
        id: '2',
        code: 'T-7891',
        gender: 'Male',
        qualification: 'B.A in English, MA in Education',
        experience: '4 Years',
        address: 'Uttara Sector 11, Dhaka',
        students: 8,
        salary: '6500 BDT',
        subjects: 'English, General Math',
        daysPerWeek: 5
    },
    // Add more tuition objects here
];
const contactNumber = '1234567890';
const TuitionCard = ({ tuition }) => {

    const handleContactPress = () => {
        if (contactNumber) { // Assuming tuition object has contactNumber
            const phoneNumber = `tel:${contactNumber}`;

            Linking.canOpenURL(phoneNumber)
                .then(supported => {
                    if (!supported) {
                        Alert.alert('এই ডিভাইসে ফোন কল সমর্থিত নয়।');
                    } else {
                        return Linking.openURL(phoneNumber);
                    }
                })
                .catch(err => console.error('একটি ত্রুটি ঘটেছে', err));
        } else {
            Alert.alert('যোগাযোগের নম্বর উপলব্ধ নয়।');
        }
    };

    return (
        <View className="bg-white rounded-lg shadow-lg p-6 mb-4">

            {/* Tuition Code */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="code-working" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    কোড: {tuition.code}
                </Text>
            </View>
            {/* Gender */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="person" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    লিঙ্গ: {tuition.gender}
                </Text>
            </View>
            {/* Qualification */}
            <View className="flex-row items-center mb-3">
                <MaterialCommunityIcons name="book-open-variant" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    যোগ্যতা: {tuition.qualification}
                </Text>
            </View>
            {/* Address */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="location" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    ঠিকানা: {tuition.address}
                </Text>
            </View>
            {/* Students */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="school" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    ছাত্রছাত্রী: {tuition.students}
                </Text>
            </View>
            {/* Salary */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="cash" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    বেতন: {tuition.salary}
                </Text>
            </View>
            {/* Subjects */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="list" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    বিষয়: {tuition.subjects}
                </Text>
            </View>
            {/* Days per Week */}
            <View className="flex-row items-center mb-4"> {/* Slightly increased marginBottom for visual separation */}
                <Ionicons name="calendar" size={20} color="#4A5568" />
                <Text className="ml-2 text-gray-700">
                    সপ্তাহে দিন: {tuition.daysPerWeek}
                </Text>
            </View>

            {/* Contact Button */}
            <TouchableOpacity
                onPress={handleContactPress}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                <Text className="text-white text-center">যোগাযোগ করুন</Text>
            </TouchableOpacity>

        </View>
    );
};


const TuitionPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter the tuition data based on the search query
    const filteredData = tuitionData.filter((item) =>
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjects.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="যেকোনো বিষয় দিয়ে অনুসন্ধান করুন"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>


            {/* List of Tuition Cards */}
            <FlatList
                data={filteredData}
                renderItem={({ item }) => <TuitionCard tuition={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeafe',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    listContent: {
        paddingHorizontal: 16,
    },
});

export default TuitionPage;