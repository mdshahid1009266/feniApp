import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PharmacyPage = () => {
  const [searchText, setSearchText] = useState('');
  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });
  // Mock pharmacy data
  const pharmacies = [
    {
      id: '1',
      name: 'সিটি ফার্মেসি',
      address: '১২৩ মেইন স্ট্রিট, ডাউনটাউন',
      phone: '০১৮৯১৬১৪৩০০',
      operatingHours: 'সোম-শুক্র: ৮:০০ - ১০:০০',
    },
    {
      id: '2',
      name: 'গ্রিন ভ্যালি ড্রাগস',
      address: '৪৫৬ ওক এভি, ওয়েস্টসাইড',
      phone: '+১৫৫৫৯৮৭৬৫৪৩',
      operatingHours: 'সোম-রবি: ২৪ ঘণ্টা',
    },
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber) => {
    Linking.openURL(`whatsapp://send?phone=+88${phoneNumber}&text=হ্যালো%20ফার্মেসি`);
  };

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchText.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderPharmacyItem = ({ item }) => (
    <View style={styles.pharmacyCard}>
      <Text style={styles.pharmacyName}>{item.name}</Text>

      <View style={styles.infoRow}>
        <Icon name="map-marker" size={18} color="#666" />
        <Text style={styles.infoText}>{item.address}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="phone" size={18} color="#666" />
        <Text style={styles.infoText}>{item.phone}</Text>
      </View>

      <View style={styles.hoursContainer}>
        <Text style={styles.sectionTitle}>অপারেটিং সময়</Text>
        <Text style={styles.timeText}>{item.operatingHours}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCall(item.phone)}
        >
          <Icon name="phone" size={20} color="#fff" />
          <Text style={styles.buttonText}>কল করুন</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.whatsappButton]}
          onPress={() => handleWhatsApp(item.phone)}
        >
          <Icon name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>হোয়াটসঅ্যাপ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="অনুসন্ধান করুন..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View>
        <Text className='text-3xl font-bold text-gray-900 mb-1 text-center'>join us</Text>
      </View>
      <FlatList
        data={filteredPharmacies}
        renderItem={renderPharmacyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe'
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 20,
    fontFamily: 'BanglaFont',
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pharmacyCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  pharmacyName: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
    fontFamily: 'BanglaFont',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 24,
    color: '#555',
    marginLeft: 10,
    fontFamily: 'BanglaFont',
  },
  hoursContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
    fontFamily: 'BanglaFont',
  },


  timeText: {
    fontSize: 24,
    color: '#444',
    fontFamily: 'BanglaFont',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: '#4A90E2',
    marginRight: 10,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 8,
    fontFamily: 'BanglaFont',
    fontSize: 20,
  },
});

export default PharmacyPage;