import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const GiftDetailScreen = () => {
  const item = {
    image: "https://5.imimg.com/data5/BP/GW/DB/SELLER-6708125/gift-items.png",
    name: "লাক্সারি ওয়াচ",
    description: "বিশেষ উপলক্ষের জন্য একটি স্টাইলিশ এবং এলিগেন্ট ঘড়ি।",
    price: 199.99
  };
  
  // Default contact information (replace with actual numbers)
  const phoneNumber = '+8801XXXXXXXXX';
  const whatsappNumber = '+8801XXXXXXXXX';
  const whatsappMessage = `আমি "${item?.name}" প্যাকেজটি কিনতে আগ্রহী। মূল্য: ${item?.price}`;

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    Linking.openURL(url).catch(() => {
      alert('WhatsApp is not installed');
    });
  };

  const { gid } = useLocalSearchParams();
  console.log(gid);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={item?.image ? { uri: item.image } : require('../../../assets/images/demo.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.price}>মূল্য: ৳{item?.price}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>অর্ডার বা জানতে যোগাযোগ করুন:</Text>

          <TouchableOpacity style={[styles.button, styles.callButton]} onPress={handleCall}>
            <Feather name="phone-call" size={20} color="white" />
            <Text style={styles.buttonText}>সরাসরি কল করুন</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.whatsappButton]} onPress={handleWhatsApp}>
            <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
            <Text style={styles.buttonText}>WhatsApp এ মেসেজ করুন</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    fontFamily: 'Kalpurush',
  },
  price: {
    fontSize: 20,
    color: '#10b981',
    marginBottom: 15,
    fontFamily: 'Kalpurush',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 25,
    fontFamily: 'Kalpurush',
  },
  contactContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
    fontFamily: 'Kalpurush',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  callButton: {
    backgroundColor: '#3b82f6',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Kalpurush',
  },
});

export default GiftDetailScreen;