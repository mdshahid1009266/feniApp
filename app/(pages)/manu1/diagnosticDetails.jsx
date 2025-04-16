import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Doctors from "../doctors"
import { useLocalSearchParams } from 'expo-router';
const HospitalDetails = () => {

    const { itemData } = useLocalSearchParams();

    // Deserialize the item data
    const hospitalDetails = JSON.parse(itemData);
    // Sample hospital data (replace with actual data)
    const hospital = {
        name: hospitalDetails.name,
        image: hospitalDetails.img,
        contact: {
            phone: '01600-190821',
            address: hospitalDetails.address,
        }
    };

    const handleContactPress = (type, value) => {
        switch (type) {
            case 'phone':
                Linking.openURL(`tel:${value}`);
                break;
            case 'email':
                Linking.openURL(`mailto:${value}`);
                break;
            case 'address':
                // Handle address navigation
                break;
        }
    };
    return (
        <ScrollView style={styles.container}>
            {/* Hospital Image with Gradient Overlay */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: hospital.image }}
                    style={styles.hospitalImage}
                    resizeMode="cover"
                />
                <View style={styles.gradient} />
                <Text style={styles.hospitalName}>{hospital.name}</Text>
            </View>

            {/* Contact Information Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress('phone', hospital.contact.phone)}>
                    <MaterialIcons name="phone" size={24} color="#2A86FF" />
                    <Text style={styles.contactText}>{hospital.contact.phone}</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress('address')}>
                    <MaterialIcons name="location-on" size={24} color="#2A86FF" />
                    <Text style={styles.contactText}>{hospital.contact.address}</Text>
                </TouchableOpacity >
            </View>

            <View>
                <Doctors  doctors={hospitalDetails.doctors}/>
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
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    sectionContainer: {
        backgroundColor: 'white',
        marginBottom: 16,
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
    contactText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#555',
    }
});

export default HospitalDetails;