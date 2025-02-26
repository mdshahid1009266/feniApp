import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import Carousel from "../../../components/carousel";
import Carousel from "pinar";
import { useFonts } from 'expo-font';
import { Link, useLocalSearchParams } from 'expo-router';
import { getProduct } from "../../api";
import Loader from "../../../components/skeleton";


// const product1 = {
//     name: 'Premium Cotton T-Shirt',
//     price: 29.99,
//     description: 'Soft, breathable 100% cotton t-shirt with modern fit. Perfect for everyday wear or workouts.',
//     images: [
//         'https://img.drz.lazcdn.com/static/bd/p/1bf236eede1d0b8777b22ab66bea397a.png_720x720q80.png_.webp',
//         'https://img.drz.lazcdn.com/static/bd/p/1bf236eede1d0b8777b22ab66bea397a.png_720x720q80.png_.webp',
//         'https://img.drz.lazcdn.com/static/bd/p/1bf236eede1d0b8777b22ab66bea397a.png_720x720q80.png_.webp'
//     ]
// };
// const product2 = {
//     name: 'প্রিমিয়াম কটন টি-শার্ট',
//     price: "২৯.৯৯",
//     description: 'মসৃণ, শ্বাসপ্রশ্বাসযোগ্য ১০০% কটন টি-শার্ট আধুনিক ফিট সহ। দৈনন্দিন পরিধান বা ওয়ার্কআউটের জন্য আদর্শ।',
//     images: [
//         'https://img.drz.lazcdn.com/static/bd/p/c9bac56f62a57f83a26410cfab7ab5bb.jpg_720x720q80.jpg_.webp',
//         'https://img.drz.lazcdn.com/static/bd/p/c9bac56f62a57f83a26410cfab7ab5bb.jpg_720x720q80.jpg_.webp',
//         'https://img.drz.lazcdn.com/static/bd/p/c9bac56f62a57f83a26410cfab7ab5bb.jpg_720x720q80.jpg_.webp',
//     ]
// };
const ProductScreen = () => {
    const { pid } = useLocalSearchParams();
    const [product, setProduct] = useState(null); // Initialize product as null
    const [loading, setLoading] = useState(true); // Initialize loading as true
    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
    });


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true); // Start loading before fetching
                const fetchedProduct = await getProduct(pid);
                setProduct(fetchedProduct); // Set product data when received
            } catch (error) {
                console.error("Error fetching product:", error);
                // Handle error appropriately, maybe set an error state to display error message
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };
        if (pid) { // Fetch product only if pid is available
            fetchProduct();
        }
    }, [pid]);

    if (loading || !fontsLoaded) {
        return <Loader />; // Show loader while loading or fonts are not loaded
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 bg-[#dbeafe]">
                <Text>Product not found</Text>
            </SafeAreaView>
        ); // Handle case when product is null (e.g., product not found)
    }

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
                        {product.images && product.images.map((img, i) => ( // Check if product.images exists and is array
                            <View style={styles.imageContainer} key={i}>
                                <Image style={styles.image} source={{ uri: img.url }} /> {/* Use img.url */}
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
                            <Text>{product.price}</Text> <Text>টাকা</Text>
                        </Text>
                    </View>

                    <Text className="text-gray-600 mb-8 font-[BanglaFont] text-xl">
                        {product.description}
                    </Text>

                    {/* Buy Now Button */}
                    <Link
                        href={{
                            pathname: "manu3/order",
                            params: { pid: pid, pname: product.name, pprice: product.price }
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
        overflow: 'hidden',
        flex: 1
    },
    carousel: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    carouselContainer: {
        height: 200,
        marginTop: 0,
        borderRadius: 3,
        padding: 5,
    },
});

export default ProductScreen;