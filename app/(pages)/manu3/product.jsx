import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import Carousel from "../../../components/carousel";
import Carousel from "pinar";
import { useFonts } from 'expo-font';
import { Link, useLocalSearchParams } from 'expo-router';

const ProductScreen = () => {
    const { pid } = useLocalSearchParams();

    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
    });
    const product1 = {
        name: 'Premium Cotton T-Shirt',
        price: 29.99,
        description: 'Soft, breathable 100% cotton t-shirt with modern fit. Perfect for everyday wear or workouts.',
        images: [
            'https://img.drz.lazcdn.com/static/bd/p/1bf236eede1d0b8777b22ab66bea397a.png_720x720q80.png_.webp',
            'https://img.drz.lazcdn.com/static/bd/p/1bf236eede1d0b8777b22ab66bea397a.png_720x720q80.png_.webp',
            'https://img.drz.lazcdn.com/static/bd/p/1bf236eede1d0b8777b22ab66bea397a.png_720x720q80.png_.webp'
        ]
    };
    const product = {
        name: 'প্রিমিয়াম কটন টি-শার্ট',
        price: "২৯.৯৯",
        description: 'মসৃণ, শ্বাসপ্রশ্বাসযোগ্য ১০০% কটন টি-শার্ট আধুনিক ফিট সহ। দৈনন্দিন পরিধান বা ওয়ার্কআউটের জন্য আদর্শ।',
        images: [
            'https://img.drz.lazcdn.com/static/bd/p/c9bac56f62a57f83a26410cfab7ab5bb.jpg_720x720q80.jpg_.webp',
            'https://img.drz.lazcdn.com/static/bd/p/c9bac56f62a57f83a26410cfab7ab5bb.jpg_720x720q80.jpg_.webp',
            'https://img.drz.lazcdn.com/static/bd/p/c9bac56f62a57f83a26410cfab7ab5bb.jpg_720x720q80.jpg_.webp',
        ]
    };
    
    const handleBuyNow = () => {
        // Implement your buy now logic here
        console.log('Product purchased!');
    };
    useEffect(() => {
        console.log(pid);
    })
    return (
        <SafeAreaView className="flex-1 bg-[#dbeafe]">
            <ScrollView className="flex-1">
                <View className="h-96 bg-gray-100">
                    <Carousel
                        style={styles.carousel}
                        showsDots
                        dotsContainerStyle={{ position: 'absolute', bottom: 20 }}
                        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', }}
                        activeDotStyle={{ backgroundColor: '#4F46E5' }}
                    >
                        {product.images.map((img, i) => (
                            <View style={styles.imageContainer} key={i}>
                                <Image style={styles.image} source={{ uri: img }} />
                            </View>
                        ))}
                    </Carousel>
                </View>

                {/* Product Details */}
                <View className="p-4">
                    <View className="mb-4">
                        <Text className="text-2xl font-bold text-gray-900 mb-2 font-[BanglaFont]">
                            {product.name}
                        </Text>
                        <Text className="text-2xl font-bold text-[#3664f4] font-[BanglaFont]">
                            {product.price} টাকা
                        </Text>
                    </View>

                    <Text className="text-gray-600 mb-8 font-[BanglaFont] text-xl">
                        {product.description}
                    </Text>

                    {/* Buy Now Button */}
                    <Link
                        href={{
                            pathname: "manu3/order",
                            params: { pid: pid }
                        }}
                        className="bg-[#3664f4] p-4 rounded-lg text-center"
                    >
                        <Text className="text-white font-bold text-lg font-[BanglaFont]">Order Now</Text>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    dotStyle: {
        width: 30,
        height: 3,
        backgroundColor: 'silver',
        marginHorizontal: 3,
        borderRadius: 3,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        overflow: 'hidden', // Ensure content doesn't overflow
        //   marginHorizontal: 5,
        flex: 1
    },
    carousel: {
        height: '100%',
        width: '100%',
        overflow: 'hidden', // Match the image's border radius
        // backgroundColor: 'blue',
    },
    carouselContainer: {
        height: 200,
        marginTop: 0,
        borderRadius: 3,
        padding: 5,
        // backgroundColor: 'green',
    },
});
export default ProductScreen;