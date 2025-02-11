import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const DoctorConsultation = () => {
  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section} >
        <Text style={styles.heading}>ডাক্তারের পরামর্শ</Text>

        <Text style={styles.subHeading}>যেকোনো সময়, যেকোনো স্থান থেকে আমাদের বিশেষজ্ঞ ডাক্তারের সাথে পরামর্শ করুন।</Text>

        <Text style={styles.body}>
          আমরা সনদপ্রাপ্ত চিকিৎসকদের সাথে অনলাইনে পরামর্শ প্রদান করি। আপনি যদি সাধারণ স্বাস্থ্য সংক্রান্ত প্রশ্ন থাকে অথবা বিস্তারিত পরামর্শ প্রয়োজন, আমরা এখানে সাহায্য করতে প্রস্তুত।
        </Text>

        <Text style={styles.subHeading}>কীভাবে কাজ করে:</Text>
        <Text style={styles.body}>
          ১. আপনার প্রয়োজনীয় বিশেষজ্ঞ ডাক্তার নির্বাচন করুন।{'\n'}
          ২. পরামর্শের জন্য সময় নির্ধারণ করুন।{'\n'}
          ৩. ভিডিও বা টেক্সট চ্যাটের মাধ্যমে সংযোগ করুন।{'\n'}
          ৪. পেশাদার চিকিৎসা পরামর্শ (ডাক্তারের পরামর্শ) এবং চিকিৎসার সুপারিশ গ্রহণ করুন।
        </Text>

        <Text style={styles.subHeading}>কেন আমাদের নির্বাচন করবেন?</Text>
        <Text style={styles.body}>
          - প্রমাণিত অভিজ্ঞতা সম্পন্ন ডাক্তারগণ{'\n'}
          - সহজ ব্যবহারযোগ্য ইন্টারফেস{'\n'}
          - নিরাপদ এবং গোপনীয়
        </Text>

        <Text style={styles.body}>
          এখনই শুরু করুন এবং আপনার স্বাস্থ্য নিয়ন্ত্রণে নিয়ে আসুন, একদম আপনার আঙুলের নাগালে বিশেষজ্ঞ পরামর্শ!
        </Text>

        <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL("tel:017111111")}> <Ionicons name="call" size={20} color="white" style={{ marginRight: 10 }} /> <Text style={styles.contactButtonText}>যোগাযোগ</Text> </TouchableOpacity>
        <TouchableOpacity style={[styles.contactButton,{backgroundColor:'#25D366'}]} onPress={() => Linking.openURL("https://wa.me/+8801779481759")}> <Ionicons name="logo-whatsapp" size={20} color="white" style={{ marginRight: 10 }} /> <Text style={styles.contactButtonText}>WhatsApp</Text> </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
    padding: 15,
  },
  section: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'BanglaFont',
  },
  subHeading: {
    fontSize: 22,
    color: '#444',
    marginBottom: 8,
    marginTop: 15,
    fontFamily: 'BanglaFont',

  },
  body: {
    fontSize: 20,
    lineHeight: 22,
    color: '#555',
    marginBottom: 12,
    fontFamily: 'BanglaFont',
  },
  contactButton: {
    backgroundColor: '#0984e3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DoctorConsultation;
