import { MaterialIcons } from '@expo/vector-icons';
import React, { useState,useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    Linking,
    Alert
} from 'react-native';

const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      phone: "(555) 123-4567",
      email: "john.smith@clinic.com",
      location: "123 Health St, Cityville",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 2,
      name: "Dr. Sarah Lee",
      specialty: "Dermatologist",
      phone: "(555) 987-6543",
      email: "sarah.lee@clinic.com",
      location: "456 Skin Rd, Townburg",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Pediatrician",
      phone: "(555) 555-1234",
      email: "emily.johnson@clinic.com",
      location: "789 Care Ln, Kidstown",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 4,
      name: "Dr. Robert Brown",
      specialty: "Orthopedist",
      phone: "(555) 444-9876",
      email: "robert.brown@clinic.com",
      location: "321 Bone Ave, Healville",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 5,
      name: "Dr. Olivia Davis",
      specialty: "Neurologist",
      phone: "(555) 222-7777",
      email: "olivia.davis@clinic.com",
      location: "654 Brain Blvd, Neurocity",
      image: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small_2x/doctor-posing-portrait-free-photo.jpg"
    },
    {
      id: 6,
      name: "Dr. James Walker",
      specialty: "Gastroenterologist",
      phone: "(555) 888-1111",
      email: "james.walker@clinic.com",
      location: "101 Stomach Rd, Digestionville",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 7,
      name: "Dr. Isabella Martinez",
      specialty: "Endocrinologist",
      phone: "(555) 777-8888",
      email: "isabella.martinez@clinic.com",
      location: "202 Hormone St, Endocrinetown",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 8,
      name: "Dr. Daniel King",
      specialty: "Urologist",
      phone: "(555) 333-5555",
      email: "daniel.king@clinic.com",
      location: "789 Bladder Ave, Urocity",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 9,
      name: "Dr. Ava Green",
      specialty: "Psychiatrist",
      phone: "(555) 444-2222",
      email: "ava.green@clinic.com",
      location: "101 Mind St, Psychoville",
      image: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small_2x/doctor-posing-portrait-free-photo.jpg"
    },
    {
      id: 10,
      name: "Dr. Noah Carter",
      specialty: "Rheumatologist",
      phone: "(555) 555-9999",
      email: "noah.carter@clinic.com",
      location: "212 Joint Rd, Arthritisburg",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 11,
      name: "Dr. Mia Scott",
      specialty: "Ophthalmologist",
      phone: "(555) 111-3333",
      email: "mia.scott@clinic.com",
      location: "654 Vision Blvd, Eyeview",
      image: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small_2x/doctor-posing-portrait-free-photo.jpg"
    },
    {
      id: 12,
      name: "Dr. Lucas Hall",
      specialty: "Gynecologist",
      phone: "(555) 222-9999",
      email: "lucas.hall@clinic.com",
      location: "987 Women St, Maternitytown",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 13,
      name: "Dr. Chloe Wilson",
      specialty: "Infectious Disease Specialist",
      phone: "(555) 666-4444",
      email: "chloe.wilson@clinic.com",
      location: "321 Virus Ave, Microville",
      image: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small_2x/doctor-posing-portrait-free-photo.jpg"
    },
    {
      id: 14,
      name: "Dr. Ethan Taylor",
      specialty: "Hematologist",
      phone: "(555) 555-2222",
      email: "ethan.taylor@clinic.com",
      location: "654 Blood Blvd, Hemoville",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
      id: 15,
      name: "Dr. Grace Miller",
      specialty: "Allergist",
      phone: "(555) 333-2222",
      email: "grace.miller@clinic.com",
      location: "432 Allergy St, Immunotown",
      image: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small_2x/doctor-posing-portrait-free-photo.jpg"
    }
  ];
  

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showSpecialtyPicker, setShowSpecialtyPicker] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const scrollViewRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;

    // Get unique specialties and locations for filters
    const uniqueSpecialties = [...new Set(doctors.map(doctor => doctor.specialty))];
    const uniqueLocations = [...new Set(doctors.map(doctor => doctor.location))];

    // Filter doctors based on search criteria
    const filteredDoctors = doctors.filter(doctor => {
        const matchesName = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
        const matchesLocation = selectedLocation ? doctor.location === selectedLocation : true;

        return matchesName && matchesSpecialty && matchesLocation;
    });

    // Open modal with the selected image
    const openModal = (index) => {
        setCurrentIndex(index);
        setModalVisible(true);
    };

    // Once modal's ScrollView layout is complete, scroll to the correct image.
    const handleModalLayout = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: currentIndex * screenWidth, animated: false });
        }
    };

    // Update currentIndex on swipe
    const onScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentIndex(index);
    };

    // Normalize phone numbers by stripping non-numeric characters.
    const normalizePhoneNumber = (phone) => {
        return phone.replace(/\D/g, '');
    };

    // Call doctor using the Linking API
    const callDoctor = (phone) => {
        const phoneNumber = normalizePhoneNumber(phone);
        Linking.openURL(`tel:${phoneNumber}`).catch(() => {
            Alert.alert('Error', 'Unable to make a call at this time.');
        });
    };
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedSpecialty('');
        setSelectedLocation('');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowSpecialtyPicker(true)}
                >
                    <Text style={styles.filterButtonText}>
                        {selectedSpecialty || 'Select Specialty'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowLocationPicker(true)}
                >
                    <Text style={styles.filterButtonText}>
                        {selectedLocation || 'Select Location'}
                    </Text>
                </TouchableOpacity>

                {(searchQuery || selectedSpecialty || selectedLocation) && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={clearFilters}
                    >
                        <Text style={styles.clearButtonText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
                {filteredDoctors.map((item, index) => (
                    <View style={styles.card} key={item.id}>
                        <TouchableOpacity onPress={() => openModal(index)}>
                            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                        </TouchableOpacity>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.specialty}>{item.specialty}</Text>

                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${normalizePhoneNumber(item.phone)}`)}>
                                <Text style={styles.contactInfo}>{item.phone}</Text>
                            </TouchableOpacity>

                            <Text style={styles.location}>{item.location}</Text>
                        </View>
                    </View>
                ))}

                {filteredDoctors.length === 0 && (
                    <View style={styles.noResults}>
                        <Text style={styles.noResultsText}>No doctors found matching your criteria</Text>
                    </View>
                )}
            </ScrollView>

            {/* Specialty Picker Modal */}
            <Modal
                visible={showSpecialtyPicker}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.pickerModal}>
                    <ScrollView>
                        {uniqueSpecialties.map((specialty, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.pickerItem}
                                onPress={() => {
                                    setSelectedSpecialty(specialty);
                                    setShowSpecialtyPicker(false);
                                }}
                            >
                                <Text style={styles.pickerItemText}>{specialty}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.pickerClose}
                            onPress={() => setShowSpecialtyPicker(false)}
                        >
                            <Text style={styles.pickerCloseText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>

            {/* Location Picker Modal */}
            <Modal
                visible={showLocationPicker}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.pickerModal}>
                    <ScrollView>
                        {uniqueLocations.map((location, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.pickerItem}
                                onPress={() => {
                                    setSelectedLocation(location);
                                    setShowLocationPicker(false);
                                }}
                            >
                                <Text style={styles.pickerItemText}>{location}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.pickerClose}
                            onPress={() => setShowLocationPicker(false)}
                        >
                            <Text style={styles.pickerCloseText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>

            {/* ... (keep existing image modal) */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff'
    },
    header: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f2f2f2'
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2d4059'
    },
    listContainer: {
      padding: 10
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 16,
    },
    detailsContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: '#2d4059',
      marginBottom: 4,
    },
    specialty: {
      fontSize: 14,
      color: '#4a4a4a',
      marginBottom: 8,
    },
    contactInfo: {
      fontSize: 14,
      color: '#3b8cda',
      marginBottom: 4,
      textDecorationLine: 'underline',
    },
    location: {
      fontSize: 14,
      color: '#666',
      marginTop: 8,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#000'
    },
    modalImage: {
      height: '100%'
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      padding: 10,
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: 20
    },
    // Advanced Search Modal Styles
    searchModalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchModalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
    },
    searchModalTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: '#2d4059',
      textAlign: 'center'
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 12
    },
    searchModalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#2d4059',
      borderRadius: 8,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: '600'
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    filterButton: {
        height: 40,
        borderColor: '#3b8cda',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    filterButtonText: {
        color: '#3b8cda',
        fontSize: 14,
    },
    clearButton: {
        backgroundColor: '#ff4444',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    pickerModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    pickerItem: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    pickerItemText: {
        fontSize: 16,
    },
    pickerClose: {
        backgroundColor: '#3b8cda',
        padding: 16,
        marginTop: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    pickerCloseText: {
        color: 'white',
        fontWeight: 'bold',
    },
    noResults: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noResultsText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default App;