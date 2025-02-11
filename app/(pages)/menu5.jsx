import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const giftPackages = [
    "বাবা-মায়ের জন্য",
    "শ্বশুর-শাশুড়ির জন্য",
    "বড় ভাই-ছোট ভাইয়ের জন্য",
    "বড় বোন- ছোট বোন",
    "হাজেব্যান্ড-ওয়াইফ প্যাকেজ",
    "জন্মদিনের প্যাকেজ",
    "Anniversary-package",
    "বিয়ের উপহার",
    "Couple-package",
    "girlfriend-boyfriend",
    "বাচ্ছাদের জন্য গিফট",
    "কলিগ-এর জন্য গিফট",
    "বন্ধুর জন্য - বান্ধবীর জন্য",
    "নিউ-বর্ণ-বেবি গিফ্ট",
    "বেয়াই-বেয়াইন -প্যাকেজ",
    "কাস্টমাইজ"
  ];
  

const routeNames = {
  "বাবা-মায়ের জন্য": "manu5/showGifts?gitem=Parents",
  "শ্বশুর-শাশুড়ির জন্য": "manu5/showGifts?gitem=InLaws",
  "বড় ভাই-ছোট ভাইয়ের জন্য": "manu5/showGifts?gitem=Brothers",
  "বড় বোন- ছোট বোন": "manu5/showGifts?gitem=Sisters",
  "হাজেব্যান্ড-ওয়াইফ প্যাকেজ": "manu5/showGifts?gitem=HusbandWife",
  "জন্মদিনের প্যাকেজ": "manu5/showGifts?gitem=Birthday",
  "Anniversary-package": "manu5/showGifts?gitem=Anniversary",
  "বিয়ের উপহার": "manu5/showGifts?gitem=Wedding",
  "Couple-package": "manu5/showGifts?gitem=Couple",
  "girlfriend-boyfriend": "manu5/showGifts?gitem=GirlfriendBoyfriend",
  "বাচ্ছাদের জন্য গিফট": "manu5/showGifts?gitem=Kids",
  "কলিগ-এর জন্য গিফট": "manu5/showGifts?gitem=Colleagues",
  "বন্ধুর জন্য - বান্ধবীর জন্য": "manu5/showGifts?gitem=Friends",
  "নিউ-বর্ণ-বেবি গিফ্ট": "manu5/showGifts?gitem=Newborn",
  "বেয়াই-বেয়াইন -প্যাকেজ": "manu5/showGifts?gitem=InLawsCouple",
  "কাস্টমাইজ": "manu5/showGifts?gitem=Customize"
};

export default function GiftPackageList() {
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {giftPackages.map((item, index) => (
        <Link 
          href={`/${routeNames[item]}`} 
          key={index} 
          asChild
        >
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
            <Feather name="arrow-right-circle" size={24} color="#6B7280" />
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#dbeafe',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#1f2937',
    flexShrink: 1,
    marginRight: 10,
    fontWeight: 'bold',
  },
});