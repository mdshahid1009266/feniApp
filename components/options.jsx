import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

import image1 from '../assets/images/menu/image1.png';
import image2 from '../assets/images/menu/image2.jpeg';
import image3 from '../assets/images/menu/image3.png';
import image4 from '../assets/images/menu/image4.jpg';
import image5 from '../assets/images/menu/image4.jpeg';
import image6 from '../assets/images/menu/image6.png';
import image7 from '../assets/images/menu/image7.png';
import image8 from '../assets/images/menu/image8.jpeg';
import image9 from '../assets/images/menu/nimage9.png';
import image10 from '../assets/images/menu/nimage2.png';
import image13 from '../assets/images/menu/nimage4.png';
import image15 from '../assets/images/menu/nimage.png';
import image16 from '../assets/images/menu/nimage1.png';
import image17 from '../assets/images/menu/image17.png';
import image18 from '../assets/images/menu/image18.png';



const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gridTemplateColumns: 'repeat(auto-fit, minmax(33.33%, 1fr))',
    },
    cardContainer: {
        width: '30%',
        marginBottom: 15,
    },
    view: {
        width: '100%',
        height: "100%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: '0px 2px 8px 0px rgba(60, 64, 67, 0.25)',
    },
    card: {
        width: '30%',
        marginBottom: 15,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: '0px 2px 8px 0px rgba(60, 64, 67, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    cardText: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image: {
        width: 80,
        height: 50,
        resizeMode: 'contain'
    }
});
// const navigation = useNavigation();

// const handlePress = (e) => {
//     navigation.navigate(e);
// };
export default function App() {
    const menuItems = [
        { name: 'চিকিৎসা', image: image1, ref: "menu1" },
        { name: 'গাড়ি ভাড়া', image: image2, ref: "menu2" },
        { name: 'ক্রয়-বিক্রয়', image: image3, ref: "menu3" },
        { name: 'সিলিন্ডার লাগবে', image: image5, ref: "menu4" },
        { name: 'কমিউনিটি সেন্টার', image: image4, ref: "community" },
        { name: 'টিউশন', image: image6, ref: "tuitions" },
        { name: 'জব', image: image7, ref: "jobs" },
        { name: 'মিস্ত্রি লাগবে', image: image8, ref: "handyman" },
        { name: 'কোচিং', image: image9, ref: "coaching" },
        { name: 'কুটির শিল্প', image: image13, ref: "kuttirSilpo" },
        { name: 'ট্রাভেলস', image: image18, ref: "travels" },
        { name: 'স্কিলস এন্ড আইটি', image: image17, ref: "skillsAndIT" },
        { name: 'নার্সারি', image: image15, ref: "menu5" },
        { name: 'লস্ট এন্ড ফাউন্ড', image: image16, ref: "LostAndFound" },
        { name: 'সেচ্ছাসেবা', image: image10, ref: "volunteer" },
        { name: 'temp', image: image10, ref: "temp" },
    ];
    
    // const menuItems1 = [
    //     { name: 'কমিউনিটি সেন্টার', image: image4 },
    //     { name: 'টিউশন', image: image6 },
    //     { name: 'জব', image: image7 },
    //     { name: 'মিস্ত্রি লাগবে', image: image8 },
    //     { name: 'কোচিং', image: image9 },
    //     { name: 'কুটির শিল্প', image: image13 },
    //     { name: 'ট্রাভেলস', image: image18 },
    //     { name: 'স্কিলস এন্ড আইটি', image: image17 },
    //     { name: 'নার্সারি', image: image15 },
    //     { name: 'লস্ট এন্ড ফাউন্ড', image: image16 },
    //     { name: 'সেচ্ছাসেবা', image: image10 },
    // ];
    return (
        <View style={styles.grid}>
            {menuItems.map((item, index) => (
                <Link href={item.ref} key={index} style={styles.cardContainer} >
                    <View style={styles.view}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.cardText}>{item.name}</Text>
                    </View>
                </Link>
            ))
            }
            {/* {menuItems1.map((item, index) => (
                <TouchableOpacity style={styles.card} key={index}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.cardText}>{item.name}</Text>
                </TouchableOpacity>
            ))} */}
        </View >
    );
}