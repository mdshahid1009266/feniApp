import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Alert } from 'react-native';

export default function CNGBookingScreen() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    const phoneRegex = /^01\d{9}$/;

    if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'সঠিক ফোন নম্বর লিখুন';
    if (!formData.pickup.trim()) newErrors.pickup = 'পিকআপ লোকেশন প্রয়োজন';
    if (!formData.destination.trim()) newErrors.destination = 'গন্তব্য ঠিকানা প্রয়োজন';
    if (!formData.date) newErrors.date = 'তারিখ প্রয়োজন';
    if (!formData.time) newErrors.time = 'সময় প্রয়োজন';
    if (!formData.passengers || isNaN(formData.passengers))
      newErrors.passengers = 'যাত্রী সংখ্যা লিখুন';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log('Booking Data:', formData);
    Alert.alert('বুকিং সফল!', 'আপনার CNG বুকিংটি সফলভাবে সম্পন্ন হয়েছে');
    // Reset form
    setFormData({
      name: '',
      phone: '',
      pickup: '',
      destination: '',
      date: '',
      time: '',
      passengers: '',
      specialRequest: ''
    });
  };

  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CNG বুকিং ফর্ম</Text>

      {/* Name Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>নাম *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="আপনার সম্পূর্ণ নাম লিখুন"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Phone Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ফোন নম্বর *</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.errorInput]}
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          placeholder="01XXXXXXXXX"
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Pickup Location */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>পিকআপ লোকেশন *</Text>
        <TextInput
          style={[styles.input, errors.pickup && styles.errorInput]}
          value={formData.pickup}
          onChangeText={(text) => handleInputChange('pickup', text)}
          placeholder="পিকআপের স্থান লিখুন"
        />
        {errors.pickup && <Text style={styles.errorText}>{errors.pickup}</Text>}
      </View>

      {/* Destination */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>গন্তব্য ঠিকানা *</Text>
        <TextInput
          style={[styles.input, errors.destination && styles.errorInput]}
          value={formData.destination}
          onChangeText={(text) => handleInputChange('destination', text)}
          placeholder="গন্তব্যের ঠিকানা লিখুন"
        />
        {errors.destination && <Text style={styles.errorText}>{errors.destination}</Text>}
      </View>

      {/* Date and Time Row */}
      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>তারিখ *</Text>
          <TextInput
            style={[styles.input, errors.date && styles.errorInput]}
            value={formData.date}
            onChangeText={(text) => handleInputChange('date', text)}
            placeholder={new Date().toLocaleDateString('en-GB')}
          />
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>সময় *</Text>
          <TextInput
            style={[styles.input, errors.time && styles.errorInput]}
            value={formData.time}
            onChangeText={(text) => handleInputChange('time', text)}
            placeholder="HH:MM"
          />
          {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        </View>
      </View>

      {/* Passengers */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>যাত্রী সংখ্যা *</Text>
        <TextInput
          style={[styles.input, errors.passengers && styles.errorInput]}
          value={formData.passengers}
          onChangeText={(text) => handleInputChange('passengers', text)}
          placeholder="যাত্রীর সংখ্যা লিখুন"
          keyboardType="numeric"
        />
        {errors.passengers && <Text style={styles.errorText}>{errors.passengers}</Text>}
      </View>

      {/* Special Request */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>বিশেষ অনুরোধ</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={formData.specialRequest}
          onChangeText={(text) => handleInputChange('specialRequest', text)}
          placeholder="অতিরিক্ত তথ্য বা বিশেষ অনুরোধ লিখুন"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Submit Button */}
      <Pressable
        style={styles.submitButton}
        onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>বুকিং নিশ্চিত করুন</Text>
      </Pressable>

     <Text style={{
             fontSize: 18, // Equivalent to text-lg (16px or 18px depending on the base size)
             color: '#4B5563', // Equivalent to text-gray-600
             fontFamily: 'BanglaFont', // Replace with the actual font name for BanglaFont
             textAlign: 'center',
             marginTop: 18,
           }}>সরাসরি বুকিং দিতে যোগাযোগ করুন</Text>
           <Pressable
             className='bg-[#25D366] p-2 rounded-full text-center flex-row items-center justify-center mt-3'
             onPress={handleSubmit}>
             <Text className='text-white text-xl font-bold'>WhatsApp</Text>
           </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#dbeafe',
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'BanglaFont',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    color: '#34495E',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: 'BanglaFont',
  },
  input: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    color: '#2C3E50',
    fontFamily: 'BanglaFont',
  },
  errorInput: {
    borderColor: '#E74C3C',
    backgroundColor: '#FDEDEC',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'BanglaFont',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2980B9',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonPressed: {
    backgroundColor: '#2471A3',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BanglaFont',
  },
});
