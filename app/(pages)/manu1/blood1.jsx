import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, TextInput } from 'react-native';

const DonorCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const formattedQuery = text.toLowerCase();
    const filtered = data.filter(donor => {
      return (
        donor.name.toLowerCase().includes(formattedQuery) ||
        donor.bloodGroup.toLowerCase().includes(formattedQuery) ||
        donor.thana.toLowerCase().includes(formattedQuery) ||
        donor.address.toLowerCase().includes(formattedQuery)
      );
    });
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-lg shadow-gray-300 mx-4">
      {/* Header Section */}
      <View className="flex-row items-start mb-4">
        <Image
          source={{ uri: item.img }}
          className="w-20 h-20 rounded-xl mr-4"
        />
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-800 mb-1">
            {item.name}
          </Text>
          <View className="bg-red-100 px-3 py-1 rounded-full self-start">
            <Text className="text-red-600 font-semibold">
              Blood Group: {item.bloodGroup}
            </Text>
          </View>
        </View>
      </View>

      {/* Details Section */}
      <View className="space-y-2 mb-4">
        <View className="flex-row">
          <Text className="text-gray-600 w-28 font-medium">Last Donation:</Text>
          <Text className="text-gray-800 flex-1">{item.lastDonation}</Text>
        </View>
        <View className="flex-row">
          <Text className="text-gray-600 w-28 font-medium">Thana:</Text>
          <Text className="text-gray-800 flex-1">{item.thana}</Text>
        </View>
        <View className="flex-row">
          <Text className="text-gray-600 w-28 font-medium">Address:</Text>
          <Text className="text-gray-800 flex-1">{item.address}</Text>
        </View>
      </View>

      {/* Additional Info */}
      <Text className="text-gray-700 italic mb-4 leading-5">
        "{item.details}"
      </Text>

      {/* Contact Button */}
      <TouchableOpacity
        onPress={() => handleCall(item.number)}
        className="bg-green-100 py-3 rounded-lg border-2 border-green-200 active:bg-green-200"
      >
        <Text className="text-green-600 text-center font-semibold text-lg">
          Call {item.number}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Bar */}
      <View className="p-4 bg-white shadow-sm shadow-gray-200">
        <TextInput
          placeholder="Search by name, blood group, or location..."
          className="bg-gray-100 px-4 py-3 rounded-lg border border-gray-200"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Donor List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-8">
            No donors found matching your search
          </Text>
        }
      />
    </View>
  );
};

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


export default DonorCard;