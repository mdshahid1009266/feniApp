import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-center',
        gap: 15,
        gridTemplateColumns: 'repeat(auto-fit, minmax(33.33%, 1fr))',
        padding: 15,
        backgroundColor: '#dbeafe'
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

const Menu1 = () => {
    const menuItems = [
        { name: 'হাসপাতাল', image: require('../../assets/images/menu/menu1/image1.png'), ref: "manu1/hospitals" },
        { name: 'অ্যাম্বুলেন্স', image: require('../../assets/images/menu/menu1/image2.jpg'), ref: "manu1/ambulance" },
        { name: 'রক্ত', image: require('../../assets/images/menu/menu1/image3.png'), ref: "manu1/blood" },
        { name: 'ফার্মেসী', image: require('../../assets/images/menu/menu1/image44.jpeg'), ref: "manu1/pharmacy" },
        { name: 'ডায়াগনস্টিক', image: require('../../assets/images/menu/menu1/image5.jpg'), ref: "manu1/diagnostic" },
        { name: 'হোমিও', image: require('../../assets/images/menu/menu1/image6.jpg'), ref: "manu1/homeopathy" },
        { name: 'পশু-চিকিৎসা', image: require('../../assets/images/menu/menu1/image7.png'), ref: "manu1/animalCare" },
        { name: 'পরামর্শ', image: require('../../assets/images/menu/menu1/image8.png'), ref: "manu1/advice" },
    ];

    return (
        <View style={styles.grid}>
            {menuItems.map((item, index) => (
                < Link href={item.ref} key={index} style={styles.cardContainer} >
                    <View style={styles.view}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.cardText}>{item.name}</Text>
                    </View>
                </Link>
            ))
            }
        </View >
    );
};

export default Menu1;
