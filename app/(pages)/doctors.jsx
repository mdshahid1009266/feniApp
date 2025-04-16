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

const doctorImg="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
const doctorImg1="https://static.vecteezy.com/system/resources/previews/046/679/218/non_2x/smiling-muslim-female-doctor-in-white-coat-with-hijab-on-isolated-transparent-background-png.png"
const DoctorCard = ({ doctor, serial }) => {
  // Function to initiate a call when the serial badge is pressed.
  const handleCall = () => {
    Linking.openURL(`tel:01600190821`);
  };
  const handleWhatsapp = () => {
    Linking.openURL('whatsapp://send?phone=+8801600190821');
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: doctor.gender ==="male" ? doctorImg : doctorImg1 }}
        style={styles.doctorImage}
      />
      <View style={styles.infoContainer}>
        <View style={styles.textInfo}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.title}>{doctor.specialty}</Text>
          <Text style={styles.specialty}>{doctor.qualifications}</Text>
          <View style={styles.callButtonContainer}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonText}>সিরিয়াল</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whatsAppButton} onPress={handleWhatsapp}>
            <Text style={styles.callButtonText}>whatsApp</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const App = ({ doctors }) => {
  const [searchText, setSearchText] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    const lowerSearch = searchText.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(lowerSearch) ||
      doctor.specialty.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name, specialty..."
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.name.toString()}
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
    gap: 5,
  },
  doctorImage: {
    width: 120,
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 5,
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
    fontWeight: '500',
    color: '#555',
    marginVertical: 5,
  },
  specialty: {
    fontSize: 14,
    color: '#777',
  },
  callButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#0984e3',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1,
    paddingVertical: 5,
  },
  whatsAppButton: {
    backgroundColor: '#25D366',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1,
    paddingVertical: 5,
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