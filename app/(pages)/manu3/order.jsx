import React, { useState, useEffect, useContext } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Alert } from 'react-native';

// Import your user context
import { setContext } from "../../../context/userContext";
import { useLocalSearchParams } from 'expo-router';

export default function OrderConfirmationScreen() {
  const { pid } = useLocalSearchParams();
  // Access global user state
  const { isLogged, user } = setContext();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    product: '',
    quantity: '',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});

  // When the component mounts or when isLogged/user changes,
  // pre-fill the formData with user details if available.
  useEffect(() => {
    if (isLogged && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }
  }, [isLogged, user]);

  const validateForm = () => {
    let newErrors = {};
    const phoneRegex = /^01\d{9}$/;

    if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'সঠিক ফোন নম্বর লিখুন';
    if (!formData.address.trim()) newErrors.address = 'ঠিকানা প্রয়োজন';
    if (!formData.product.trim()) newErrors.product = 'পণ্যের নাম প্রয়োজন';
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0)
      newErrors.quantity = 'যথাযথ পরিমাণ লিখুন';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log('Order Data:', formData);
    Alert.alert('অর্ডার নিশ্চিত!', 'আপনার অর্ডার সফলভাবে নিশ্চিত হয়েছে');
    // Reset form
    setFormData({
      name: isLogged && user ? user.name || '' : '',
      phone: isLogged && user ? user.phone || '' : '',
      address: isLogged && user ? user.address || '' : '',
      product: '',
      quantity: '',
      specialRequest: ''
    });
  };

  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });

  useEffect(() => {
    console.log("pid", pid);

  },);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>অর্ডার নিশ্চিতকরণ ফর্ম</Text>

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

      {/* Address Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ঠিকানা *</Text>
        <TextInput
          style={[styles.input, errors.address && styles.errorInput]}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          placeholder="আপনার ঠিকানা লিখুন"
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>

      {/* Product Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>পণ্য *</Text>
        <TextInput
          style={[styles.input, errors.product && styles.errorInput]}
          value={formData.product}
          onChangeText={(text) => handleInputChange('product', text)}
          placeholder="পণ্যের নাম লিখুন"
        />
        {errors.product && <Text style={styles.errorText}>{errors.product}</Text>}
      </View>

      {/* Quantity Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>পরিমাণ *</Text>
        <TextInput
          style={[styles.input, errors.quantity && styles.errorInput]}
          value={formData.quantity}
          onChangeText={(text) => handleInputChange('quantity', text)}
          placeholder="পরিমাণ লিখুন"
          keyboardType="numeric"
        />
        {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}
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
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>অর্ডার নিশ্চিত করুন</Text>
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
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BanglaFont',
  },
});
