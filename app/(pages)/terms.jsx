import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Linking } from 'react-native';

const TermsAndConditions = () => {
  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../assets/fonts/SolaimanLipi.ttf"),
  });
  const termsText = `
আমাদের ওয়েবসাইটে আপনাকে স্বাগতম। আমাদের ওয়েবসাইট ব্যবহার করার আগে, অনুগ্রহ করে নিম্নলিখিত শর্তাবলী মনোযোগ সহকারে পড়ুন। এই শর্তাবলী আমাদের ওয়েবসাইট এবং এর মাধ্যমে প্রদত্ত পণ্য ও পরিষেবা ব্যবহারের নিয়মকানুন বর্ণনা করে। আমাদের ওয়েবসাইট ব্যবহার করে, আপনি এই শর্তাবলী মেনে চলতে সম্মত হচ্ছেন।

সাধারণ শর্তাবলী

*   আমাদের ওয়েবসাইট ব্যবহার করার জন্য আপনাকে কমপক্ষে ১৮ বছর বয়সী হতে হবে।
*   আপনি আমাদের ওয়েবসাইট শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করতে পারবেন। কোনো অবৈধ বা অনৈতিক উদ্দেশ্যে আমাদের ওয়েবসাইট ব্যবহার করা যাবে না।
*   আমাদের ওয়েবসাইটে প্রকাশিত সমস্ত তথ্য, যেমন - টেক্সট, গ্রাফিক্স, লোগো, ছবি, ভিডিও, ইত্যাদি আমাদের সম্পত্তি। আমাদের লিখিত অনুমতি ছাড়া এগুলো ব্যবহার করা যাবে না।
*   আমরা আমাদের ওয়েবসাইটে প্রকাশিত তথ্যের সঠিকতা নিশ্চিত করার চেষ্টা করি। তবে, আমরা কোনো তথ্যের ত্রুটি বা অসম্পূর্ণতার জন্য দায়ী নই।
*   আমরা যেকোনো সময় আমাদের ওয়েবসাইটের শর্তাবলী পরিবর্তন করার অধিকার রাখি। পরিবর্তিত শর্তাবলী ওয়েবসাইটে প্রকাশ করার সাথে সাথেই কার্যকর হবে।

পণ্য ও পরিষেবা

*   আমাদের ওয়েবসাইটে প্রদর্শিত পণ্য ও পরিষেবার দাম এবং প্রাপ্যতা সময়ের সাথে পরিবর্তিত হতে পারে।। আমরা পূর্ব নোটিশ ছাড়াই দাম ও প্রাপ্যতা পরিবর্তন করার অধিকার রাখি।
*   আমরা আমাদের ওয়েবসাইটে প্রদর্শিত পণ্যের গুণমান এবং বৈশিষ্ট্য সম্পর্কে কোনো ওয়ারেন্টি দিই না।
*   পণ্য কেনার জন্য, আপনাকে আমাদের ওয়েবসাইটে দেওয়া নির্দেশনা অনুসরণ করতে হবে।
*   আমরা অর্ডার বাতিল করার বা ফেরত দেওয়ার অধিকার রাখি।

অর্থ পরিশোধ

*   আপনাকে আমাদের ওয়েবসাইটে দেওয়া পদ্ধতিতে পণ্যের মূল্য পরিশোধ করতে হবে।
*   আমরা বিভিন্ন ধরনের পেমেন্ট পদ্ধতি গ্রহণ করি, যেমন - বিকাশ, নগদ, রকেট, ইত্যাদি।
*   আপনার পেমেন্ট সফল হওয়ার পরেই আপনার অর্ডার নিশ্চিত করা হবে।

এই শর্তাবলী বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত হবে।
ধন্যবাদ!

যোগাযোগ
যদি আপনার কোনো প্রশ্ন বা অভিযোগ থাকে, তাহলে আমাদের সাথে যোগাযোগ করতে পারেন। আমাদের ইমেইল ঠিকানা: polas@gmail.com
  `;

  const handleContactPress = () => {
    // Replace with your actual phone number
    const phoneNumber = '01234567890';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>শর্তাবলী</Text>
        <Text style={styles.termsText}>{termsText}</Text>

        <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
          <Text style={styles.contactButtonText}>যোগাযোগ করুন</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
    padding: 20,
  },
  content: {
    backgroundColor: 'white', // White card background
    borderRadius: 8, // Rounded corners
    padding: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text color
    fontFamily: 'BanglaFont',
    textAlign: 'center',
  },
  termsText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#555', // Slightly lighter text color
    fontFamily: 'BanglaFont',
  },
  contactButton: {
    backgroundColor: '#007bff', // Blue button
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TermsAndConditions;