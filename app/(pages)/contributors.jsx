import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const contributors = [
  {
    id: 1,
    name: 'John Doe',
    slogan: 'Building awesome apps!',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    social: {
      twitter: 'johndoe',
      github: 'johndoe'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    slogan: 'Mobile first enthusiast',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    social: {
      twitter: 'janesmith',
      github: 'janesmith'
    }
  },
  // Add more contributors as needed
];

const ContributorCard = ({ contributor }) => (
  <View style={styles.card}>
    <Image 
      source={{ uri: contributor.image }} 
      style={styles.avatar}
    />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{contributor.name}</Text>
      <Text style={styles.slogan}>{contributor.slogan}</Text>
    </View>
    <View style={styles.socialContainer}>
      <MaterialIcons name="twitter" size={24} color="#1DA1F2" style={styles.icon} />
      <MaterialIcons name="code" size={24} color="#333" style={styles.icon} />
    </View>
  </View>
);

export default function ContributorsPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.header}>Our Amazing Team</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {contributors.map((contributor) => (
          <ContributorCard 
            key={contributor.id} 
            contributor={contributor} 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
    color: '#2D3436',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  slogan: {
    fontSize: 14,
    color: '#636E72',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
});