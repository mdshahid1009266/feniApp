import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    FlatList,
    StyleSheet,
    TextInput
} from 'react-native';
import { Link } from 'expo-router';

const img = "https://static.vecteezy.com/system/resources/thumbnails/007/681/899/small/hospital-building-outside-composition-vector.jpg"

const hospitals = [
    { name: 'হাসপাতাল ১', img: img },
    { name: 'হাসপাতাল ২', img: img },
    { name: 'হাসপাতাল ৩', img: img },
    { name: 'হাসপাতাল ৪', img: img },
    { name: 'হাসপাতাল ৫', img: img },
    { name: 'হাসপাতাল ৬', img: img },
    { name: 'হাসপাতাল ৭', img: img },
    { name: 'হাসপাতাল ৮', img: img },
    { name: 'হাসপাতাল ৯', img: img },
    { name: 'হাসপাতাল ১০', img: img },
    { name: 'হাসপাতাল ১১', img: img },
    { name: 'হাসপাতাল ১২', img: img },
    { name: 'হাসপাতাল ১৩', img: img },
    { name: 'হাসপাতাল ১৪', img: img },
    { name: 'হাসপাতাল ১৫', img: img },
];


const HospitalCard = ({ item }) => (
    <View style={styles.cardContainer}>
        {/* <Link href="manu1/HospitalDetails" style={styles.cardContainer}> */}
        <ImageBackground
            source={typeof item.img === 'string' ? { uri: item.img } : item.img}
            style={styles.image}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.overlay}>
                <Text style={styles.hospitalName}>{item.name}</Text>
                <Link href={`manu1/diagnosticDetails`} style={styles.infoIcon}>
                    <Text style={styles.infoIconText}>➔</Text>
                </Link>
            </View>
        </ImageBackground>
        {/* </Link> */}
    </View>
);

const App = () => {
    const [searchText, setSearchText] = useState('');

    // Filter hospitals based on search text (case-insensitive)
    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search Hospitals"
                    placeholderTextColor="#666"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <FlatList
                data={filteredHospitals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <HospitalCard item={item} />}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hospitals found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
         backgroundColor: '#dbeafe'
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    cardContainer: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 220,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        resizeMode: 'cover',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hospitalName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
    infoIcon: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    infoIconText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

