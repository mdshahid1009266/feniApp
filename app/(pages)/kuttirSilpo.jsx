import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Linking,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// Updated mock data with images
const mockProducts = [
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  {
    id: 1,
    name: 'নকশি কাঁথা',
    measurement: '১ টি',
    weight: '২২০ গ্রাম',
    price: 2500,
    image: 'https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/12/04/dfcb7e6da1209906f0775bb44fc86d6a-656d8838e80c3.jpg?jadewits_media_id=143022'
  },
  {
    id: 2,
    name: 'মাটির পাত্র',
    measurement: '১ টি',
    weight: '১৫০ গ্রাম',
    price: 120,
    image: 'https://www.newsbangla24.com/assets/news_images/2022/01/17/MP_01.webp'
  },
  // Add more products...
];

const ProductsPage = () => {
  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../assets/fonts/SolaimanLipi.ttf"),
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (err) {
        setError('ডেটা লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleCall = async () => {
    try {
      await Linking.openURL('tel:+8801234567890');
    } catch (err) {
      Alert.alert('কল করতে সমস্যা হয়েছে', 'দয়া করে সরাসরি কল করুন: ০১২৩৪৫৬৭৮৯০');
    }
  };

  const handleWhatsApp = async () => {
    const phoneNumber = '8801234567890'; // Replace with your WhatsApp number
    const message = 'আমি আপনার কুটিরশিল্প পণ্য সম্পর্কে জানতে আগ্রহী!'; // Default message

    try {
      await Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
    } catch (err) {
      Alert.alert('হোয়াটসঅ্যাপ খুলতে সমস্যা হয়েছে', 'দয়া করে সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-red-500 text-lg text-center font-[BanglaFont]">{error}</Text>
      </View>
    );
  }

  const renderProductItem = ({ item }) => (
    <View className="bg-white p-4 rounded-2xl shadow-lg mb-4 mx-4" style={styles.card}>
      <View className="flex-row gap-2">
        <View className="flex-1">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full rounded-2xl mr-4"
            resizeMode="cover"
          />
        </View>

        <View className="flex-3">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-gray-800 text-xl font-[BanglaFont] flex-1">{item.name}</Text>
            <Text className="text-blue-500 font-bold font-[BanglaFont]">৳{item.price}</Text>
          </View>

          <View className="mb-2">
            <Text className="text-base text-gray-600 font-[BanglaFont]">পরিমাপ: {item.measurement}</Text>
            <Text className="text-base text-gray-600 font-[BanglaFont]">ওজন: {item.weight}</Text>
          </View>

          <View className="flex-row justify-between space-x-2">
            <TouchableOpacity
              onPress={handleCall}
              className="bg-blue-500 py-2 px-4 rounded-full flex-row items-center flex-1 justify-center"
            >
              <Feather name="phone" size={16} color="white" />
              <Text className="text-white ml-2 font-[BanglaFont]">কল</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleWhatsApp}
              className="bg-green-500 py-2 px-4 rounded-full flex-row items-center flex-1 justify-center"
            >
              <Feather name="message-circle" size={16} color="white" />
              <Text className="text-white ml-2 font-[BanglaFont]">হোয়াটসঅ্যাপ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pb-4 mt-4">
        <View className="bg-white rounded-xl px-4 py-3 flex-row items-center shadow-sm">
          <Feather name="search" size={20} color="#6b7280" />
          <TextInput
            placeholder="পণ্য খুঁজুন..."
            placeholderTextColor="#9ca3af"
            className="flex-1 ml-2 text-base text-gray-800 font-[BanglaFont]"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {filteredProducts.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg font-[BanglaFont]">কোনো পণ্য পাওয়া যায়নি</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={{ paddingVertical: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ProductsPage;