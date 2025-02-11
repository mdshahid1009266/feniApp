import { View, Text, FlatList, Image, TouchableOpacity, TextInput, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'; // Or @react-native-community/vector-icons
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'

const CommunityCentersPage = () => {
    const [searchQuery, setSearchQuery] = useState('')

    // Mock data - replace with your actual data
    const communityCenters = [
        {
            id: 1,
            name: 'Downtown Community Hub',
            address: '123 Main St, City Center',
            number: "1234567890",
            description: 'মসৃণ, শ্বাসপ্রশ্বাসযোগ্য ১০০% কটন টি-শার্ট আধুনিক ফিট সহ। দৈনন্দিন পরিধান বা ওয়ার্কআউটের জন্য আদর্শ।',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-S1yGVmeEXBrurgkcOwFuQk9F1uzzPFL9lA&s",
        },
        {
            id: 2,
            name: 'Riverside Cultural Center',
            address: '456 River Rd, East District',
            number: "1234567890",
            description: 'মসৃণ, শ্বাসপ্রশ্বাসযোগ্য ১০০% কটন টি-শার্ট আধুনিক ফিট সহ। দৈনন্দিন পরিধান বা ওয়ার্কআউটের জন্য আদর্শ।',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-S1yGVmeEXBrurgkcOwFuQk9F1uzzPFL9lA&s",
        },
        // Add more centers as needed
    ]
    const handleCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch(() => Alert.alert('Could not make a call.'));
    };
    const CommunityCenterCard = ({ center }) => (
        <View className="bg-white rounded-2xl  mb-4 " style={{ elevation: 5,boxShadow: '0px 2px 8px 0px rgba(60, 64, 67, 0.25)', }}>
            <Image
                source={{uri: center.image}}
                defaultSource={require('../../assets/images/demo.jpg')}
                // className="w-full h-48 rounded-xl mb-4"
                style={{width:"100%",height:180,borderRadius:12,marginBottom:16}}
                resizeMode="cover"
            />

            <View className="flex-row justify-between items-start mb-2 px-2">
                <Text className="text-xl font-bold text-slate-800 flex-1">
                    {center.name}
                </Text>

            </View>

            <Text className="text-slate-700 font-medium mb-3 flex items-center gap-2 px-2"><Ionicons name="location" size={18} color="lightGray" /> {center.address}</Text>
            <Text className="text-slate-500 text-sm mb-3 px-2">{center.description}</Text>


            <TouchableOpacity className="bg-blue-500 py-3 rounded-b-xl" onPress={() => handleCall(center.number)}>
                <Text className="text-white font-bold text-center">Book Now</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-blue-100">
            <View className="flex-1 px-4 pt-4">
                {/* Search Bar */}
                <View className="bg-white flex-row items-center rounded-xl py-3 mb-6 shadow-sm shadow-slate-200">
                    <Feather name="search" size={20} color="gray" />
                    <TextInput
                        placeholder="Search centers..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 text-slate-800"
                        placeholderTextColor="#94a3b8"
                    />
                </View>

                {/* Centers List */}
                <FlatList
                    data={communityCenters}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CommunityCenterCard center={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default CommunityCentersPage