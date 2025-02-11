import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

const doctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    title: "PHD at Gestrology",
    specialty: "Cardiologist",
    phone: "(555) 123-4567",
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
  },
  {
    id: 2,
    name: "Dr. Jane Doe",
    title: "MD at SkinCare",
    specialty: "Dermatologist",
    phone: "(555) 987-6543",
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    title: "MD, Pediatric Specialist",
    specialty: "Pediatrician",
    phone: "(555) 555-1212",
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
  },
  // Add more doctor objects if needed.
];

const DoctorCard = ({ doctor, serial }) => {
  // Function to initiate a call when the serial badge is pressed.
  const handleCall = () => {
    // Remove any non-digit characters from the phone number.
    const phoneNumber = doctor.phone.replace(/[^\d]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: doctor.image }}
        style={styles.doctorImage}
      />
      <View style={styles.infoContainer}>
        <View style={styles.textInfo}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.title}>{doctor.title}</Text>
          <Text style={styles.specialty}>Specialty: {doctor.specialty}</Text>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonText}>serial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const [searchText, setSearchText] = useState('');

  // Filter doctors by name, title, or specialty (case-insensitive)
  const filteredDoctors = doctors.filter(doctor => {
    const lowerSearch = searchText.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(lowerSearch) ||
      doctor.title.toLowerCase().includes(lowerSearch) ||
      doctor.specialty.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name, title, or specialty"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <DoctorCard doctor={item} serial={index + 1} />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No doctors found.</Text>
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
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  searchInput: {
    backgroundColor: '#eef1f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    // Android elevation
    elevation: 4,
  },
  doctorImage: {
    width: 120,
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    padding: 5,
    // paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInfo: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  title: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#777',
  },
  callButton: {
    backgroundColor: '#0984e3',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default App;
