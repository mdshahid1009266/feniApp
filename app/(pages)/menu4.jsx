import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { getGasPrice } from '../api';
import { useEffect, useState } from 'react';
import { Try } from 'expo-router/build/views/Try';

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
    },
    image: {
        width: 80,
        height: 50,
        resizeMode: 'contain'
    }
});

const Menu1 = () => {
    const [gasPrice, setGasPrice] = useState({});
    const [loding, setLoding] = useState(true);
    const menuItems = [
        { name: 'Omera', image: require('../../assets/images/menu/menu4/image1.jpg'), ref: "manu4/cylinder" },
        { name: 'Total', image: require('../../assets/images/menu/menu4/image2.png'), ref: "manu4/cylinder" },
        { name: 'Beximco', image: require('../../assets/images/menu/menu4/image3.png'), ref: "manu4/cylinder" },
        { name: 'Jamuna', image: require('../../assets/images/menu/menu4/image4.jpg'), ref: "manu4/cylinder" },
        { name: 'Others', image: require('../../assets/images/menu/others.png'), ref: "manu4/cylinder" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGasPrice();
                setGasPrice(data);
                setLoding(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch gas price. Please try again later.');
            }
        };
        fetchData();
    }, []);

    console.log(gasPrice);
    if (loding) {
        return (
            <View className="flex-1 bg-blue-100 pt-10 px-4 min-h-screen  items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <View style={styles.grid}>
            {menuItems.map((item, index) => (
                <Link
                    href={{
                        pathname: item.ref,
                        params: {
                            gname: item.name,
                            gprice: gasPrice[item.name] // passing the gas price for the specific company
                        }
                    }}
                    key={index} style={styles.cardContainer}>
                    <View style={styles.view}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.cardText}>{item.name}</Text>
                    </View>
                </Link>
            ))}
        </View>
    );
};

export default Menu1;
