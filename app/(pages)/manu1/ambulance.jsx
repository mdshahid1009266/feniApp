import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking, FlatList, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Sample ambulance data
const ambulanceData = [
  {
    id: "1",
    name: "City Ambulance",
    address: "123 Main Street, Metropolis",
    number: "+1234567890",
  },
  {
    id: "2",
    name: "Rapid Response",
    address: "456 Elm Street, Gotham",
    number: "+0987654321",
  },
  {
    id: "3",
    name: "Emergency Aid",
    address: "789 Oak Street, Star City",
    number: "+1122334455",
  },
];

const AmbulanceItem = ({ ambulance }) => {
  const handleCall = () => {
    const phoneUrl = `tel:${ambulance.number}`;
    Linking.openURL(phoneUrl).catch((err) => console.error("Error opening dialer", err));
  };

  return (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-xl font-bold mb-2">{ambulance.name}</Text>
      <Text className="text-gray-700 mb-1 text-lg">{ambulance.address}</Text>
      <Text className="text-gray-700 mb-3 text-lg">{ambulance.number}</Text>
      <TouchableOpacity onPress={handleCall} className="bg-blue-500 flex-row items-center mt-1 rounded-full p-2 justify-center">
        <Text className="text-white text-center text-lg font-bold">Call</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center mt-3 bg-[#25D366] rounded-full p-2 justify-center" onPress={() => Linking.openURL("https://wa.me/+8801779481759")}>
        <Text className="text-white text-lg font-bold ">WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [searchText, setSearchText] = useState("");

  // Filtered ambulance data based on search
  const filteredData = ambulanceData.filter((ambulance) =>
    ambulance.name.toLowerCase().includes(searchText.toLowerCase()) ||
    ambulance.address.toLowerCase().includes(searchText.toLowerCase()) ||
    ambulance.number.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-blue-100 p-4">
      {/* Search Input */}
      <TextInput
        className="bg-white p-3 rounded-lg shadow mb-4 text-lg"
        placeholder="Search Ambulance..."
        placeholderTextColor="#777"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Ambulance List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AmbulanceItem ambulance={item} />}
        ListEmptyComponent={<Text className="text-center text-gray-500 mt-4">No results found</Text>}
      />
    </View>
  );
};

export default App;
