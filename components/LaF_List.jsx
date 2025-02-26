import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { getAllLostPerson } from "../app/api";

const LostAndFoundScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLostPerson();
        // Map the API data to match the component's expected field names
        const mappedData = data.map(item => ({
          ...item,
          contact: item.number,      // Map 'number' to 'contact'
          image: item.imageUrl,      // Map 'imageUrl' to 'image'
        }));
        setPeopleData(mappedData);
        setFilteredData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch lost persons. Please check your network or try again later.');
      }
    };

    fetchData();
  }, []);

  // Handle search input changes
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(peopleData);
    } else {
      const filtered = peopleData.filter((item) =>
        item.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Handle the contact call action
  const handleCall = async (contact) => {
    if (!contact) {
      Alert.alert('Error', 'Contact information is not available for this person.');
      return;
    }
    const url = `tel:${contact}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device.');
      }
    } catch (error) {
      console.error("Call error:", error);
      Alert.alert('Error', 'An error occurred while trying to make the call.');
    }
  };

  // Render each lost person as a card
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.image ? { uri: item.image } : require('../assets/images/demo.jpg')}
        style={styles.image}
        resizeMode="cover"
        onError={(error) => console.error("Image load error:", error.nativeEvent.error)}
      />
      <Text style={styles.description}>{item.description}</Text>
      {item.createdAt && (
        <Text style={styles.dateText}>
          Reported on: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      )}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => handleCall(item.contact)}
      >
        <Ionicons name="call" size={20} color="#fff" style={{ marginRight: 5 }} />
        <Text style={styles.contactButtonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search lost persons..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {filteredData.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No persons found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || item.imageId} // Use 'id' or 'imageId' as fallback
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#777',
  },
});

export default LostAndFoundScreen;