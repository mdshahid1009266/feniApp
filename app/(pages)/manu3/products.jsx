// ProductsPage.jsx
import React, { useState, useMemo } from 'react';
import { FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Optional icon library
import { Link, useLocalSearchParams } from 'expo-router';

// Dummy data for products. Replace this with your API call or state management logic.
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image:
            'https://img.drz.lazcdn.com/static/bd/p/53a59dd888ab235550765404c3dcfeb4.jpg_720x720q80.jpg_.webp',
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        name: 'Gaming Mouse',
        price: 49.99,
        image:
            'https://img.drz.lazcdn.com/static/bd/p/21f8ab342d310b24d2605542af2a33e0.jpg_720x720q80.jpg_.webp',
    },
    {
        id: 4,
        name: 'Mechanical Keyboard',
        price: 89.99,
        image:
            'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 5,
        name: 'Gaming Mouse',
        price: 49.99,
        image:
            'https://img.drz.lazcdn.com/static/bd/p/21f8ab342d310b24d2605542af2a33e0.jpg_720x720q80.jpg_.webp',
    },
    {
        id: 6,
        name: 'Mechanical Keyboard',
        price: 89.99,
        image:
            'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80',
    },
    // Add more products as needed...
];

// A reusable Product Card component
const ProductCard = ({ product, onPress }) => {
    return (
        <Link
            href={{
                pathname: "manu3/product",
                params: { pid: product.id }
            }}
            className="bg-white rounded-lg shadow m-2 flex-1"
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: product.image }}
                className="w-full h-32 rounded-lg"
                resizeMode="cover"
            />
            <View className="p-2">
                <Text className="text-lg font-semibold text-gray-800">
                    {product.name}
                </Text>
                <Text className="text-gray-500 mt-1">${product.price.toFixed(2)}</Text>
            </View>
        </Link>
    );
};

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products based on the search term
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleProductPress = (product) => {
        console.log('Product pressed:', product);
        // Navigate to product detail page or perform other actions
    };
    const { catagory } = useLocalSearchParams();
    console.log(catagory);

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
                    <Text className="text-gray-500 text-lg font-[BanglaFont]">কোনো পণ্য পাওয়া যায়নি</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Two products per row
                    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <ProductCard product={item} onPress={handleProductPress} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}

        </SafeAreaView>
    );
};

export default ProductsPage;
