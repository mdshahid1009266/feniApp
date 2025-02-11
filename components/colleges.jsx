import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function App() {
    const collegesData = [
        {
            name: "ঢাকা বিশ্ববিদ্যালয়",
            students: "৫০,০০০+ (প্রায়)",
            established: "১৯২১",
            contact: "02-9661900",
            address: "নুহাশ পল্লী, ঢাকা, বাংলাদেশ",
        },
        {
            name: "চট্টগ্রাম বিশ্ববিদ্যালয়",
            students: "২৫,০০০+ (প্রায়)",
            established: "১৯৬৬",
            contact: "031-720671",
            address: "চট্টগ্রাম বিশ্ববিদ্যালয় ক্যাম্পাস, চট্টগ্রাম, বাংলাদেশ",
        },
        {
            name: "রাজশাহী বিশ্ববিদ্যালয়",
            students: "২০,০০০+ (প্রায়)",
            established: "১৯৫৩",
            contact: "0721-750208",
            address: "রাজশাহী বিশ্ববিদ্যালয়, রাজশাহী, বাংলাদেশ",
        },
        {
            name: "খুলনা বিশ্ববিদ্যালয়",
            students: "১৬,০০০+ (প্রায়)",
            established: "১৯৯১",
            contact: "041-750100",
            address: "খুলনা বিশ্ববিদ্যালয়, খুলনা, বাংলাদেশ",
        },
        {
            name: "ব্রাক্ষ্মণবাড়িয়া সরকারি কলেজ",
            students: "১৫,০০০+ (প্রায়)",
            established: "১৯৬২",
            contact: "0341-63345",
            address: "ব্রাক্ষ্মণবাড়িয়া, বাংলাদেশ",
        },
        {
            name: "ঢাকা কলেজ",
            students: "২০,০০০+ (প্রায়)",
            established: "১৮৪১",
            contact: "02-9562717",
            address: "ঢাকা কলেজ, ঢাকা, বাংলাদেশ",
        },
        {
            name: "বগুড়া সরকারি কলেজ",
            students: "১৮,০০০+ (প্রায়)",
            established: "১৯২১",
            contact: "051-62126",
            address: "বগুড়া শহর, বাংলাদেশ",
        },
        {
            name: "শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (SUST)",
            students: "১৪,০০০+ (প্রায়)",
            established: "১৯৮৬",
            contact: "0821-731206",
            address: "শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়, সিলেট, বাংলাদেশ",
        },
        {
            name: "রাজশাহী কলেজ",
            students: "১৮,০০০+ (প্রায়)",
            established: "১৮৭৩",
            contact: "0721-721040",
            address: "রাজশাহী শহর, বাংলাদেশ",
        },
        {
            name: "মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
            students: "১০,০০০+ (প্রায়)",
            established: "১৯৯৮",
            contact: "01977-380442",
            address: "মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়, টাঙ্গাইল, বাংলাদেশ",
        },
    ];


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredColleges, setFilteredColleges] = useState(collegesData);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = collegesData.filter(college =>
            Object.values(college).some(value =>
                value.toString().toLowerCase().includes(text.toLowerCase())
            )
        );
        setFilteredColleges(filtered);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredColleges(collegesData);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <FontAwesome
                    name="search"
                    size={20}
                    color="#666"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="খুঁজুন..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearch}
                    returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <FontAwesome
                            name="times-circle"
                            size={18}
                            color="#666"
                        />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={filteredColleges}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CollegeInfo college={item} highlight={searchQuery} />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const CollegeInfo = ({ college, highlight }) => {
    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const handleOpenMap = (coordinates) => {
        const [lat, lng] = coordinates.split(',');
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Linking.openURL(url);
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return <Text>{text}</Text>;

        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);

        return (
            <Text>
                {parts.map((part, i) => (
                    regex.test(part) ? (
                        <Text key={i} style={{ backgroundColor: '#ffeb3b' }}>
                            {part}
                        </Text>
                    ) : (
                        <Text key={i}>{part}</Text>
                    )
                ))}
            </Text>
        );
    };

    return (
        <View style={styles.collegeContainer}>
            <View style={styles.infoRow}>
                <Text style={styles.label}>নাম:</Text>
                <View style={styles.valueContainer}>
                    {highlightText(college.name, highlight)}
                </View>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>ছাত্র-ছাত্রী:</Text>
                <View style={styles.valueContainer}>
                    {highlightText(college.students, highlight)}
                </View>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>প্রতিষ্ঠিত:</Text>
                <View style={styles.valueContainer}>
                    {highlightText(college.established, highlight)}
                </View>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>যোগাযোগ:</Text>
                <View style={styles.valueContainer}>
                    {highlightText(college.contact, highlight)}
                    <TouchableOpacity
                        onPress={() => handleCall(college.contact)}
                        style={styles.iconButton}
                    >
                        <FontAwesome name="phone" size={16} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>ঠিকানা
                    <Text > :</Text>
                </Text>
                <View style={styles.valueContainer}>
                    {highlightText(college.address, highlight)}
                    <TouchableOpacity
                        onPress={() => handleOpenMap(college.name)}
                        style={styles.iconButton}
                    >
                        <FontAwesome name="map-marker" size={16} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginVertical: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 12,
    },
    clearButton: {
        padding: 8,
    },
    collegeContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: '600',
        color: '#2c3e50',
        width: 100,
        // backgroundColor: 'green',
        display: 'flex',
        alignItems: 'flex-end',
    },
    valueContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    iconButton: {
        // backgroundColor: '#007AFF',
        marginLeft: 10,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    listContent: {
        paddingBottom: 120,
    },
});