import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const coachesData = [
  {
    id: 1,
    name: 'John Fitness',
    description: 'Certified Personal Trainer & Nutrition Specialist with 8 years of experience',
    image: 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',
    phone: '15551234567',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Sarah Yoga',
    description: 'Professional Yoga Instructor and Mindfulness Coach',
    image: 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',
    phone: '15559876543',
    rating: 4.8
  },
  // Add more coaches as needed
];

export default function CoachingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [coaches, setCoaches] = useState(coachesData);

  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (phone) => {
    Linking.openURL(`https://wa.me/${phone}`);
  };

  const renderCoachItem = ({ item }) => (
    <View style={styles.coachCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.coachImage}
        resizeMode="cover"
      />
      
      <View style={styles.coachInfo}>
        <Text style={styles.coachName}>{item.name}</Text>
        <Text style={styles.coachDescription}>{item.description}</Text>
        
        <View style={styles.contactContainer}>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleCall(item.phone)}
          >
            <FontAwesome name="phone" size={20} color="#fff" />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contactButton, styles.whatsappButton]}
            onPress={() => handleWhatsApp(item.phone)}
          >
            <FontAwesome name="whatsapp" size={20} color="#fff" />
            <Text style={styles.buttonText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search coaches..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredCoaches}
        renderItem={renderCoachItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.noResults}>No coaches found</Text>
        }
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  coachCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  coachImage: {
    width: '100%',
    height: 200,
  },
  coachInfo: {
    padding: 16,
  },
  coachName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  coachDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});