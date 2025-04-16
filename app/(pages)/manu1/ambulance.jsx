import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking, FlatList, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import axios from 'axios';

const AmbulanceItem = ({ ambulance }) => {
  const handleCall = () => {
    const phoneUrl = `tel:${ambulance.number}`;
    Linking.openURL(phoneUrl).catch((err) => console.error("Error opening dialer", err));
  };

  return (
    <View className="bg-white p-5 rounded-xl shadow-lg mb-4">
      <Text className="text-xl font-bold text-gray-800 mb-3">{ambulance.name}</Text>

      <View className="flex-row items-center mb-2">
        <Icon
          name="map-marker"
          size={20}
          color="#6B7280"
          className="mr-2"
        />
        <Text className="text-gray-600 text-base">{ambulance.location}</Text>
      </View>

      <View className="flex-row items-center mb-4">
        <Icon
          name="phone"
          size={20}
          color="#6B7280"
          className="mr-2"
        />
        <Text className="text-gray-600 text-base">{ambulance.number}</Text>
      </View>

      <TouchableOpacity
        className="bg-blue-500 rounded-full px-4 py-3 justify-center items-center mb-3"
        onPress={handleCall}
      >
        <Text className="text-white font-semibold text-lg">কল করুন</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#25D366] rounded-full px-4 py-3 justify-center items-center flex-row"
        onPress={() => Linking.openURL(`https://wa.me/${ambulance.contactNumber}`)}
      >
        <Icon
          name="whatsapp"
          size={24}
          color="white"
          className="mr-2"
        />
        <Text className="text-white font-semibold text-lg">WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [ambulances, setAmbulances] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await axios.get('https://api-upokar.onrender.com/getAllAmbulances');
        if (response.data && Array.isArray(response.data)) {
          setAmbulances(response.data);
          setFilteredData(response.data);
        } else {
          setError('অ্যাম্বুলেন্স ডেটা লোড করতে সমস্যা হয়েছে');
        }
      } catch (err) {
        setError('ডেটা লোড করতে ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  useEffect(() => {
    const filtered = ambulances.filter(ambulance =>
      ambulance.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      ambulance.address?.toLowerCase().includes(searchText.toLowerCase()) ||
      ambulance.contactNumber?.includes(searchText)
    );
    setFilteredData(filtered);
  }, [searchText, ambulances]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-700 text-lg">লোড হচ্ছে...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-100 p-4">
        <Ionicons name="sad-outline" size={50} color="#ef4444" />
        <Text className="text-red-500 text-xl text-center mt-4 font-bold">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-100 p-4">
      <TextInput
        className="bg-white p-3 rounded-lg shadow mb-4 text-lg"
        placeholder="অ্যাম্বুলেন্স খুঁজুন..."
        placeholderTextColor="#777"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AmbulanceItem ambulance={item} />}
        ListEmptyComponent={
          <View className="items-center mt-8">
            <Ionicons name="alert-circle-outline" size={40} color="#666" />
            <Text className="text-gray-600 text-lg mt-2">
              {ambulances.length === 0
                ? "কোন অ্যাম্বুলেন্স পাওয়া যায়নি"
                : "খুঁজে পাওয়া যায়নি"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default App;