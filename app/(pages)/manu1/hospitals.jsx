import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import img from "../../../assets/images/demo.jpg"





const hospitals = [
  { name: 'হাসপাতাল ১', img: img },
  { name: 'হাসপাতাল ২', img: img },
  { name: 'হাসপাতাল ৩', img: img },
  { name: 'হাসপাতাল ৪', img: img },
  { name: 'হাসপাতাল ৫', img: img },
  { name: 'হাসপাতাল ৬', img: img },
  { name: 'হাসপাতাল ৭', img: img },
  { name: 'হাসপাতাল ৮', img: img },
  { name: 'হাসপাতাল ৯', img: img },
  { name: 'হাসপাতাল ১০', img: img },
  { name: 'হাসপাতাল ১১', img: img },
  { name: 'হাসপাতাল ১২', img: img },
  { name: 'হাসপাতাল ১৩', img: img },
  { name: 'হাসপাতাল ১৪', img: img },
  { name: 'হাসপাতাল ১৫', img: img },
];





const HospitalList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredHospitals(filtered);
  };


  const renderHospitalCard = ({ item, index }) => (
    <Link
      key={index} // Assign the index as the key
      href="manu1/HospitalDetails"
      style={styles.cardContainer}
    >
      <View style={styles.view}>
        <Image source={item.img} style={styles.hospitalImage} />
        <View style={styles.textContainer}>
          <Text style={styles.hospitalName}>{item.name}</Text>
          {/* <Text style={styles.hospitalDetails}>{item.details}</Text> */}
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="হাসপাতাল খুঁজুন..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredHospitals}
        renderItem={renderHospitalCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginVertical: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cardContainer: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  view: {
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hospitalDetails: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HospitalList;