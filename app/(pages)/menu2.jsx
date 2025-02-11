import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // gap: 15,
        // gridTemplateColumns: 'repeat(auto-fit, minmax(33.33%, 1fr))',
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
        fontStyle: 'bold'
    },
    image: {
        width: 80,
        height: 50,
        resizeMode: 'contain'
    }
});

const Menu1 = () => {
    const menuItems = [
        { name: 'CAR লাগবে', image: require('../../assets/images/menu/menu2/image1.png'), ref: "manu2/car" },
        { name: 'BUS  লাগবে', image: require('../../assets/images/menu/menu2/image2.jpg'), ref: "manu2/bus" },
        { name: 'TRUCK লাগবে', image: require('../../assets/images/menu/menu2/image3.png'), ref: "manu2/truck" },
        { name: 'CNG লাগবে', image: require('../../assets/images/menu/menu2/image4.png'), ref: "manu2/cng" },
        { name: 'BIKE লাগবে', image: require('../../assets/images/menu/menu2/image6.jpg'), ref: "manu2/bike" },
        { name: 'লেগুনা লাগবে', image: require('../../assets/images/menu/menu2/image5.jpg'), ref: "manu2/leguna" },
    ];

    return (
        <View style={styles.grid}>
            {menuItems.map((item, index) => (
                < Link href={item.ref} key={index} style={styles.cardContainer} >
                    <View style={styles.view}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.cardText} className='font-bold'>{item.name}</Text>
                    </View>
                </Link>
            ))
            }
        </View >
    );
};

export default Menu1;
