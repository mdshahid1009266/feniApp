import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


const HospitalDetails = () => {
    const { itemData } = useLocalSearchParams();

    // Deserialize the item data
    const hospitalDetails = JSON.parse(itemData);

    const hospital = {
        name: 'City General Hospital',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/007/681/899/small/hospital-building-outside-composition-vector.jpg',
        contact: {
            phone: '+1 (555) 123-4567',
            email: 'info@cityhospital.com',
            address: '123 Medical Center Dr, Health City, HC 54321'
        },
        services: [
            'Emergency Care',
            'Cardiology',
            'Pediatrics',
            'Orthopedics',
            'Maternity',
            'Oncology',
            'Neurology',
            'Radiology'
        ]
    };

    const handleContactPress1 = (type, value) => {
        switch (type) {
            case 'phone':
                Linking.openURL(`tel:${value}`);
                break;
            case 'address':
                // Open Google Maps with the hospital address
                const formattedAddress = encodeURIComponent(value);
                const googleMapsUrl = `https://www.google.com/maps?q=${formattedAddress}`;
                Linking.openURL(googleMapsUrl);
                break;
        }
    };
    return (
        <ScrollView style={styles.container}>
            {/* Hospital Image with Gradient Overlay */}
            <View style={styles.imageContainer}>
                <Image
                    source={hospitalDetails.imageUrl ? { uri: hospitalDetails.imageUrl } : { uri: hospital.image }}
                    style={styles.hospitalImage}
                    resizeMode="cover"
                />
                <View style={styles.gradient} />
                <Text style={styles.hospitalName}>{hospitalDetails.name}</Text>
            </View>

            {/* Contact Information Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress1('address', hospitalDetails.location)}>
                    <MaterialIcons name="location-on" size={24} color="#2A86FF" />
                    <Text style={styles.contactText}>{hospitalDetails.location}</Text>
                </TouchableOpacity >


                <TouchableOpacity style={styles.hospitalCllBtn} onPress={() => handleContactPress1('phone', hospitalDetails.contact)}>
                    <MaterialIcons name="phone" size={24} style={styles.hospitalCllBtnIcon} />
                    {/* <Text style={styles.contactText}>{hospital.contact.phone}</Text> */}
                    <Text style={styles.hospitalCllBtnText}>Call Now</Text>
                </TouchableOpacity >
            </View>

            {/* Services Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Available Services</Text>
                <View style={styles.servicesContainer}>
                    {hospitalDetails.services.map((service, index) => (
                        <View key={index} style={styles.servicePill}>
                            <Text style={styles.serviceText}>{service}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeafe',
        position: 'relative',
    },
    imageContainer: {
        height: 250,
        position: 'relative',
    },

    hospitalImage: {
        width: '100%',
        height: '100%',
        // objectFit: 'contain',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay color
        opacity: 0.3, // Optional: control transparency of the gradient
    },
    hospitalName: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: '90%',
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        textTransform: 'capitalize',
    },
    sectionContainer: {
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    hospitalCllBtn: {
        backgroundColor: '#25D366',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flex: 1,
        paddingVertical: 10,
    },
    hospitalCllBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hospitalCllBtnIcon: {
        marginRight: 10,
        color: 'white',
        fontSize: 24,
    },
    contactText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#555',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    servicePill: {
        backgroundColor: '#E8F3FF',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
    },
    serviceText: {
        color: '#2A86FF',
        fontSize: 14,
    },
});

export default HospitalDetails;