import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, TextInput, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DonorCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [filteredData, setFilteredData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDonor, setNewDonor] = useState({
    name: '',
    address: '',
    number: '',
    lastDonation: '',
    details: '',
    bloodGroup: '',
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterData(text, selectedFilters);
  };

  const toggleFilter = (group) => {
    const newFilters = new Set(selectedFilters);
    newFilters.has(group) ? newFilters.delete(group) : newFilters.add(group);
    setSelectedFilters(newFilters);
    filterData(searchQuery, newFilters);
  };

  const filterData = (query, filters) => {
    const formattedQuery = query.toLowerCase();
    const filtered = data.filter(donor => {
      const matchesSearch =
        donor.name.toLowerCase().includes(formattedQuery) ||
        donor.thana.toLowerCase().includes(formattedQuery);
      const matchesFilter = filters.size > 0 ? filters.has(donor.bloodGroup) : true;
      return matchesSearch && matchesFilter;
    });
    setFilteredData(filtered);
  };

  const handleAddDonor = () => {
    setFilteredData([...filteredData, newDonor]);
    console.log('New Donor:', newDonor);
    
    setNewDonor({ name: '', address: '', number: '', lastDonation: '', details: '', bloodGroup: '' });
    setModalVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------


  const renderItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-lg shadow-gray-300 mx-4">
      <View className="flex-row items-start mb-4">
        <Image
          source={{ uri: item.img }}
          className="w-24 h-24 rounded-2xl mr-4"
        />
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-1">
            {item.name}
          </Text>
          <View className="bg-red-200 px-4 py-2 rounded-full self-start">
            <Text className="text-red-600 font-semibold">
              {item.bloodGroup}
            </Text>
          </View>
        </View>
      </View>

      <View className="space-y-3 mb-5">
        <InfoRow label="Last Donation" value={item.lastDonation} />
        <InfoRow label="Location" value={`${item.thana}, ${item.address}`} />
      </View>

      <Text className="text-gray-600 italic mb-5 leading-5">
        "{item.details}"
      </Text>

      <TouchableOpacity
        onPress={() => handleCall(item.number)}
        className="bg-emerald-500 py-4 rounded-xl flex-row justify-center items-center space-x-2 active:bg-emerald-600"
      >
        <Ionicons name="call" size={20} color="white" />
        <Text className="text-white font-bold text-lg">
          Call {item.number}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-blue-100">
      {/* Search and Filters Section */}
      <View className="p-4 bg-white shadow-sm shadow-gray-200">
        <View className="flex-row items-center mb-4 space-x-3 gap-2">
          <View className="flex-1 relative">
            <TextInput
              placeholder="Search donors..."
              className="bg-gray-100 pl-5 pr-10 py-3 rounded-2xl text-gray-700 shadow-sm"
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <Ionicons
              name="search"
              size={20}
              color="#6b7280"
              className="absolute right-3 top-3"
            />
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-green-500 p-3 rounded-full shadow-lg">
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} transparent animationType="slide">
          <View className="flex-1 justify-center bg-black/50 p-5">
            <View className="bg-white rounded-2xl p-6">
              <Text className="text-xl font-bold mb-4">Add New Donor</Text>
              <ScrollView>
                <TextInput placeholder="Name" value={newDonor.name} onChangeText={(text) => setNewDonor({ ...newDonor, name: text })} className="border p-3 mb-3 rounded" />
                <TextInput placeholder="Address" value={newDonor.address} onChangeText={(text) => setNewDonor({ ...newDonor, address: text })} className="border p-3 mb-3 rounded" />
                <TextInput placeholder="Number" value={newDonor.number} onChangeText={(text) => setNewDonor({ ...newDonor, number: text })} keyboardType="phone-pad" className="border p-3 mb-3 rounded" />
                <TextInput placeholder="Last Donation" value={newDonor.lastDonation} onChangeText={(text) => setNewDonor({ ...newDonor, lastDonation: text })} className="border p-3 mb-3 rounded" />
                <TextInput placeholder="Comment" value={newDonor.details} onChangeText={(text) => setNewDonor({ ...newDonor, details: text })} className="border p-3 mb-3 rounded" />
                <Text className="text-lg font-bold mb-2">Blood Group:</Text>
                <ScrollView horizontal className="flex-row space-x-2" showsHorizontalScrollIndicator={false}>
                  {bloodGroups.map((group) => (
                    <TouchableOpacity key={group} onPress={() => setNewDonor({ ...newDonor, bloodGroup: group })} className={`px-4 py-2 rounded-full ${newDonor.bloodGroup === group ? 'bg-red-500' : 'bg-gray-100'}`}>
                      <Text className={`${newDonor.bloodGroup === group ? 'text-white' : 'text-gray-600'}`}>{group}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-gray-300 p-3 rounded-lg flex-1 mr-2">
                    <Text className="text-center font-bold">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAddDonor} className="bg-emerald-600 p-3 rounded-lg flex-1 ml-2">
                    <Text className="text-center text-white font-bold">Submit</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-3"
        >
          {bloodGroups.map((group) => (
            <TouchableOpacity
              key={group}
              onPress={() => toggleFilter(group)}
              className={`px-4 py-2 rounded-full ${selectedFilters.has(group)
                ? 'bg-red-500'
                : 'bg-gray-100'
                }`}
            >
              <Text className={`font-medium ${selectedFilters.has(group)
                ? 'text-white'
                : 'text-gray-600'
                }`}>
                {group}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Donor List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Ionicons name="heart-dislike" size={40} color="#d1d5db" />
            <Text className="text-gray-400 text-lg mt-4">
              No matching donors found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View className="flex-row">
    <Text className="text-gray-500 w-28 font-medium">{label}:</Text>
    <Text className="text-gray-800 flex-1">{value}</Text>
  </View>
);


export default DonorCard;

const data = [
  {
    name: 'Zubayet Hossain Shadhin',
    bloodGroup: 'B+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '20/6/24',
    thana: 'Faridpur Sadar',
    address: 'Muraridah, Faridpur',
    details: 'সম্ভব হলে ইনশাআল্লাহ যেকোনো সময় খুব প্রয়োজনে রক্ত দান করবো।',
    number: '017XXXXXXX1'
  },
  {
    name: 'Md Moniruzzaman',
    bloodGroup: 'B+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '24-12-2024',
    thana: 'Faridpur Sadar',
    address: 'রঘুনন্দনপুর মাদ্রাসা, ফরিদপুর সদর, ফরিদপুর',
    details: 'উপকার পেয়ে কৃপণতা না করার অনুরোধ।',
    number: '017XXXXXXX2'
  },
  {
    name: 'তসলিম হাসান নাঈম',
    bloodGroup: 'O+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '10/08/2024',
    thana: 'মধুখালি',
    address: 'চানমারি আবহাওয়া অফিস, ফরিদপুর',
    details: '',
    number: '017XXXXXXX3'
  },
  {
    name: 'Md Zisan Molla',
    bloodGroup: 'A+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '09/11/2024',
    thana: 'মধুখালি',
    address: 'Murardia',
    details: 'প্রতি ৩ মাস পর পর নিদিষ্ট একটা রুগীকেই রক্ত দেই',
    number: '017XXXXXXX4'
  },
  {
    name: 'Ashik Khan',
    bloodGroup: 'O-',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '17-8-24',
    thana: 'ফরিদপুর সদর',
    address: 'Murshidabad',
    details: '',
    number: '017XXXXXXX5'
  },
  {
    name: 'Shahidul Islam',
    bloodGroup: 'AB+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '05/10/2024',
    thana: 'কাশিয়ানী',
    address: 'কোতয়ালী, ফরিদপুর',
    details: 'রক্ত দান একটি মহৎ কাজ।',
    number: '017XXXXXXX6'
  },
  {
    name: 'Rashedul Alam',
    bloodGroup: 'A-',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '02/01/2024',
    thana: 'শাহদৌলাহপুর',
    address: 'Faridpur',
    details: 'যেকোনো মুহূর্তে রক্ত দিতে প্রস্তুত।',
    number: '017XXXXXXX7'
  },
  {
    name: 'Salma Akter',
    bloodGroup: 'B-',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '13/06/2024',
    thana: 'ব্রাহ্মণবাড়িয়া',
    address: 'মোল্লারচর',
    details: '',
    number: '017XXXXXXX8'
  },
  {
    name: 'Sabbir Hossain',
    bloodGroup: 'O+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '11/03/2024',
    thana: 'মাধবদী',
    address: 'ঢাকা',
    details: 'আপনার সাহায্য প্রয়োজন হলে আমি আছি।',
    number: '017XXXXXXX9'
  },
  {
    name: 'Khadiza Begum',
    bloodGroup: 'A+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '19/05/2024',
    thana: 'বাউফল',
    address: 'গোলামদী',
    details: '',
    number: '017XXXXXXX10'
  },
  {
    name: 'Shuvro Roy',
    bloodGroup: 'AB-',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '16/07/2024',
    thana: 'চরফ্যাশন',
    address: 'ভোলা',
    details: 'রক্ত দান মানবতার সেবা।',
    number: '017XXXXXXX11'
  },
  {
    name: 'Mohammad Nabil',
    bloodGroup: 'B+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '22/09/2024',
    thana: 'গাইবান্ধা',
    address: 'কামালপুর',
    details: 'রক্ত দিতে আমি সবসময় প্রস্তুত।',
    number: '017XXXXXXX12'
  },
  {
    name: 'Nusrat Jahan',
    bloodGroup: 'O+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '30/10/2024',
    thana: 'দাউদকান্দি',
    address: 'কুমিল্লা',
    details: 'সাহায্যের জন্য সদা প্রস্তুত।',
    number: '017XXXXXXX13'
  },
  {
    name: 'Sujon Mia',
    bloodGroup: 'A+',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '23/02/2024',
    thana: 'মধ্যখাল',
    address: 'ফরিদপুর',
    details: 'বিপদের সময় পাশে দাঁড়ানোই মূল উদ্দেশ্য।',
    number: '017XXXXXXX14'
  },
  {
    name: 'Shima Begum',
    bloodGroup: 'O-',
    img: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
    lastDonation: '08/12/2024',
    thana: 'চট্টগ্রাম',
    address: 'কোতোয়ালী',
    details: 'সবাইকে রক্ত দানে উদ্বুদ্ধ করুন।',
    number: '017XXXXXXX15'
  }
];