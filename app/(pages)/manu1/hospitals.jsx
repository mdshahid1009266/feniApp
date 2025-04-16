import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import img from "../../../assets/images/demo.jpg"

const HospitalList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('https://api-upokar.onrender.com/getAllHospitals');
        if (response.data && Array.isArray(response.data)) {
          setHospitals(response.data);
          setFilteredHospitals(response.data);
        } else {
          setError('Invalid hospital data format');
        }
      } catch (err) {
        setError('Failed to fetch hospitals. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredHospitals(filtered);
  };

  const renderHospitalCard = ({ item, index }) => {
    return (
      <Link
        key={index}
        href={{
          pathname: 'manu1/HospitalDetails',
          params: { itemData: JSON.stringify(item) }
        }}
        style={styles.cardContainer}
      >
        <View style={styles.view}>
          <Image
            source={item.imageUrl ? { uri: item.imageUrl } : img}
            style={styles.hospitalImage}
            defaultSource={img}
          />
          <View style={styles.textContainer}>
            <Text style={styles.hospitalName}>{item.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </View>
      </Link>
    )
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="warning" size={40} color="#ef4444" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
        ListEmptyComponent={
          <View style={styles.center}>
            <Ionicons name="sad-outline" size={40} color="#666" />
            <Text style={styles.emptyText}>কোন হাসপাতাল পাওয়া যায়নি</Text>
          </View>
        }
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginTop: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});


export default HospitalList;
