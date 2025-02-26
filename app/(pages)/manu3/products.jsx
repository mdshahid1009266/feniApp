// ProductsPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { getAllProducts } from "../../api";
import Loader from "../../../components/skeleton";

const ProductCard = ({ product, onPress }) => {
    const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : "https://via.placeholder.com/150"; // Default image if no image url

    return (
        <Link
            href={{
                pathname: "manu3/product",
                params: { pid: product._id } // Use product._id as pid
            }}
            className="bg-white rounded-lg shadow m-2 flex-1"
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: imageUrl }}
                className="w-full h-32 rounded-t-lg" // rounded-t-lg for top rounded corners
                resizeMode="cover"
            />
            <View className="p-2">
                <Text className="text-lg font-semibold text-gray-800">
                    {product.name}
                </Text>
                <Text className="text-gray-500 mt-1">TK {product.price.toFixed(2)}</Text>
            </View>
        </Link>
    );
};

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { catagory } = useLocalSearchParams();

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, products]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(catagory);
                setProducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [catagory]); // Added category as dependency

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SafeAreaView className="flex-1 bg-blue-100">
            {/* Header with Search Bar */}
            <View className="px-4 py-4 bg-white shadow">
                <View className="flex-row items-center bg-gray-200 rounded-lg px-3">
                    <Feather name="search" size={20} color="gray" />
                    <TextInput
                        placeholder="Search products..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        className="flex-1 py-2 px-2 text-base text-gray-800"
                    />
                </View>
            </View>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-500 text-lg font-[BanglaFont]">
                        <Text>কোনো পণ্য পাওয়া যায়নি</Text> {/* Added an extra <Text> wrapper - for debugging */}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <ProductCard product={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default ProductsPage;