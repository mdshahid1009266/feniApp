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

const lostItemsData = [
  {
    id: '1',
    description: 'Lost Wallet near the park. Black leather wallet with several cards.',
    contact: '1234567890',
  },
  {
    id: '2',
    description: 'Missing keys – silver keychain with a red ribbon.',
    contact: '0987654321',
  },
  {
    id: '3',
    description: 'Lost Dog: Brown Labrador spotted near downtown.',
    contact: '5555555555',
  },
  // Add more items as needed
];

const LostAndFoundScreen = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          setItems(lostItemsData);
          setFilteredItems(lostItemsData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setFetchError('Failed to fetch lost items.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filtered items as the search term changes
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  // Handle the contact call button press
  const handleCall = async (contact) => {
    const url = `tel:${contact}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while trying to make the call.');
    }
  };

  // Render each lost item as a card
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.image ? { uri: item.image } : require('../assets/images/demo.jpg')}
        style={styles.image}
      />
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => handleCall(item.contact)}
      >
        <Ionicons name="call" size={20} color="#fff" style={{ marginRight: 5 }} />
        <Text style={styles.contactButtonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{fetchError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search lost items..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>
      {filteredItems.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No items found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    backgroundColor: '',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    width: '100%',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // paddingVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    width: '100%',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#777',
  },
});

export default LostAndFoundScreen;