import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Linking, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const PharmacyPage = () => {
  const [searchText, setSearchText] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('https://api-upokar.onrender.com/getPharmacy');
        if (response.data && response.data.length > 0) {
          setPharmacies(response.data);
        } else {
          setError('No pharmacies found');
        }
      } catch (err) {
        setError('Failed to fetch pharmacies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber) => {
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+88${phoneNumber}`;
    Linking.openURL(`whatsapp://send?phone=${formattedNumber}&text=হ্যালো%20ফার্মেসি`);
  };

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchText.toLowerCase()) ||
    pharmacy.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderPharmacyItem = ({ item }) => (
    <View style={styles.pharmacyCard}>
      <Text style={styles.pharmacyName}>{item.name}</Text>

      <View style={styles.infoRow}>
        <Icon name="map-marker" size={20} color="#4A90E2" />
        <Text style={styles.infoText}>{item.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="phone" size={20} color="#4A90E2" />
        <Text style={styles.infoText}>{item.number}</Text>
      </View>

      <View style={styles.hoursContainer}>
        <Text style={styles.sectionTitle}>অপারেটিং সময়</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCall(item.number)}
        >
          <Icon name="phone" size={20} color="#fff" />
          <Text style={styles.buttonText}>কল করুন</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.whatsappButton]}
          onPress={() => handleWhatsApp(item.number)}
        >
          <Icon name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>হোয়াটসঅ্যাপ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>ডেটা লোড হচ্ছে...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Icon name="alert-circle" size={50} color="#FF6B6B" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (filteredPharmacies.length === 0) {
      return (
        <View style={styles.centered}>
          <Icon name="magnify-close" size={50} color="#888" />
          <Text style={styles.noResultsText}>কোন ফার্মেসি পাওয়া যায়নি</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredPharmacies}
        renderItem={renderPharmacyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>নিকটস্থ ফার্মেসি</Text> */}
        <TextInput
          style={styles.searchInput}
          placeholder="ফার্মেসি খুঁজুন..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8'
  },
  header: {
    backgroundColor: '#4A90E2',
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 15,
    fontFamily: 'BanglaFont',
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    fontFamily: 'BanglaFont',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  pharmacyCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  pharmacyName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
    fontFamily: 'BanglaFont',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginLeft: 12,
    fontFamily: 'BanglaFont',
    lineHeight: 24,
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
    marginBottom: 8,
    fontFamily: 'BanglaFont',
    fontWeight: '600',
  },
  timeText: {
    fontSize: 18,
    color: '#444',
    fontFamily: 'BanglaFont',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  callButton: {
    backgroundColor: '#4A90E2',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 8,
    fontFamily: 'BanglaFont',
    fontSize: 18,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#4A90E2',
    fontFamily: 'BanglaFont',
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    fontFamily: 'BanglaFont',
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'BanglaFont',
  },
});

export default PharmacyPage;