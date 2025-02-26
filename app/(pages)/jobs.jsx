

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { getAllJobs } from '../api';


const JobItem = ({ job }) => {
    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../assets/fonts/SolaimanLipi.ttf"),
    });
    const handleContact = () => {
        Linking.openURL(`tel:${job.contactNumber}`).catch((err) => {
            Alert.alert('কল করা যাচ্ছে না', 'সরাসরি ডায়াল করুন: ' + job.contactNumber);
        });
    };

    return (
        <View className="bg-white rounded-xl shadow-md mb-4 p-4 ">
            <Text className="text-lg font-bold mb-2 font-[BanglaFont]">নিয়োগকারী: {job.employer}</Text>
            <View className="mb-1 flex-row items-center">
                <Ionicons name="briefcase-outline" size={16} color="gray" />
                <Text className="ml-1 text-lg text-gray-700 font-[BanglaFont]">পদবী: {job.jobType}</Text>
            </View>
            <View className="mb-1 flex-row items-center">
                <Ionicons name="cash-outline" size={16} color="gray" />
                <Text className="ml-1 text-lg text-gray-700 font-[BanglaFont]">বেতন: {job.salary}</Text>
            </View>
            <View className="mb-1 flex-row items-center">
                <Ionicons name="checkmark-circle-outline" size={16} color="gray" />
                <Text className="ml-1 text-lg text-gray-700 font-[BanglaFont]">যোগ্যতা: {job.qualification}</Text>
            </View>
            <View className="mb-1 flex-row items-center">
                <Ionicons name="bar-chart-outline" size={16} color="gray" />
                <Text className="ml-1 text-lg text-gray-700 font-[BanglaFont]">অভিজ্ঞতা: {job.experience}</Text>
            </View>
            <View className="mb-1 flex-row items-center">
                <Ionicons name="calendar-outline" size={16} color="gray" />
                <Text className="ml-1 text-lg text-gray-700 font-[BanglaFont]">সময়সীমা: {job.deadline}</Text>
            </View>
            <View className="mb-1 flex-row items-center">
                <Ionicons name="location-outline" size={16} color="gray" />
                <Text className="ml-1 text-lg text-gray-700 font-[BanglaFont]">লোকেশন: {job.location}</Text>
            </View>
            <View className="mb-2">
                <Text className="text-lg text-gray-700 font-[BanglaFont]">কাজের বিবরণী: {job.description}</Text>
            </View>
            <TouchableOpacity
                onPress={handleContact}
                className="bg-blue-500 py-2 rounded-md items-center justify-center"
            >
                <Text className="text-white font-bold font-[BanglaFont]">যোগাযোগ করুন</Text>
            </TouchableOpacity>
        </View>
    );
};

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobData, setJobData] = useState([]);
    const [loding, setLoding] = useState(true);
    const [filteredJobs, setFilteredJobs] = useState([]); // Initialize filteredJobs to empty array

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = jobData.filter(job => {
            const searchText = text.toLowerCase();
            return (
                job.employer.toLowerCase().includes(searchText) ||
                job.jobType.toLowerCase().includes(searchText) ||
                job.location.toLowerCase().includes(searchText) ||
                job.description.toLowerCase().includes(searchText)
            );
        });
        setFilteredJobs(filtered);
    };

    const getJobs = async () => {
        try {
            const jobs = await getAllJobs();
            setJobData(jobs);
            setFilteredJobs(jobs); // Initially set filteredJobs to all jobs after fetching
        } catch (error) {
            Alert.alert('Failed to get jobs');
        } finally {
            setLoding(false);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);
    if (loding) {
        return (
            <View className="flex-1 bg-blue-100 pt-10 px-4 min-h-screen  items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <View className="flex-1 bg-blue-100 pt-10 px-4">
            <View className="mb-4">
                <TextInput
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-300"
                    placeholder="🔍 চাকরি খুঁজুন..."
                    placeholderTextColor="#a3a3a3"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredJobs.map((job, index) => (
                    <JobItem key={index} job={job} />
                ))}
                {filteredJobs.length === 0 && (
                    <Text className="text-center text-gray-500 py-4">কোনো চাকরি পাওয়া যায়নি</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default App;