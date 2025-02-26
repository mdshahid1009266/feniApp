import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Alert } from 'react-native';

// Import your user context
import { setContext } from "../../../context/userContext";
import { useLocalSearchParams } from 'expo-router';

import { createOrder } from '../../api';

export default function OrderConfirmationScreen() {
  const { pid, pname, pprice } = useLocalSearchParams();
  // Access global user state
  const { isLogged, user } = setContext();

  // Convert pprice to a number
  const productPrice = parseFloat(pprice) || 0;

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    quantity: 1,
    specialRequest: '',
    pid: pid || '',
    pprice: pprice || 0,
    pname: pname || '',  // Keep pname here
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form data if user details exist
  useEffect(() => {
    if (isLogged && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        number: user.number || '',
        address: user.address || ''
      }));
    }
  }, [isLogged, user]);

  // Update pname directly in formData
  useEffect(() => {
    if (pname) {
      setFormData(prev => ({ ...prev, pname: pname }));
    }
  }, [pname]);

  const validateForm = () => {
    let newErrors = {};
    const numberRegex = /^01\d{9}$/;

    if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন';
    if (!numberRegex.test(formData.number)) newErrors.number = 'সঠিক ফোন নম্বর লিখুন';
    if (!formData.address.trim()) newErrors.address = 'ঠিকানা প্রয়োজন';
    if (formData.quantity < 1 || formData.quantity > 100)
      newErrors.quantity = 'পরিমাণ ১ থেকে ১০০ এর মধ্যে হওয়া উচিত';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const incrementQuantity = () => {
    setFormData(prev => {
      const newQuantity = prev.quantity < 100 ? prev.quantity + 1 : 100;
      return { ...prev, quantity: newQuantity };
    });
  };

  const decrementQuantity = () => {
    setFormData(prev => {
      const newQuantity = prev.quantity > 1 ? prev.quantity - 1 : 1;
      return { ...prev, quantity: newQuantity };
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Calculate the total price based on quantity
    const updatedPrice = productPrice * formData.quantity;

    // Add the updatedPrice to formData
    const updatedFormData = {
      ...formData,
      totalPrice: updatedPrice,  // Add the updated price to formData
    };

    try {
      await createOrder(updatedFormData);
      Alert.alert('আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে');
      setFormData({
        name: isLogged && user ? user.name || '' : '',
        number: isLogged && user ? user.number || '' : '',
        address: isLogged && user ? user.address || '' : '',
        pname: pname || '', // Keep pname in the reset form
        quantity: 1,
        specialRequest: '',
        pid: pid || '',  // Keep pid in the reset form
      });

    } catch (error) {
      Alert.alert('অর্ডার নিশ্চিতকরণ সফলভাবে সম্পন্ন হয়নি');
    }

  };

  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });

  if (!fontsLoaded) return null;

  // Calculate total price based on the current quantity
  const totalPrice = productPrice * formData.quantity;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>অর্ডার নিশ্চিত করুন</Text>

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

      {/* Phone Number Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ফোন নম্বর *</Text>
        <TextInput
          style={[styles.input, errors.number && styles.errorInput]}
          value={formData.number}
          onChangeText={(text) => handleInputChange('number', text)}
          placeholder="01XXXXXXXXX"
          keyboardType="phone-pad"
        />
        {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
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

      {/* Product Display */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>পণ্য</Text>
        <View style={styles.productContainer}>
          <Text style={styles.productText}>{pname || 'পণ্য নির্বাচন করুন'}</Text>
        </View>
      </View>

      {/* Quantity and Price Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>পরিমাণ ও মূল্য *</Text>
        <View style={styles.quantityRow}>
          <View style={[styles.quantityControl, errors.quantity && styles.errorInput]}>
            <Pressable
              style={[styles.quantityButton, formData.quantity <= 1 && styles.disabledButton]}
              onPress={decrementQuantity}
              disabled={formData.quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>–</Text>
            </Pressable>
            <Text style={styles.quantityValue}>{formData.quantity}</Text>
            <Pressable
              style={[styles.quantityButton, formData.quantity >= 100 && styles.disabledButton]}
              onPress={incrementQuantity}
              disabled={formData.quantity >= 100}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>৳ {totalPrice.toFixed(2)}</Text>
          </View>
        </View>
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
    backgroundColor: '#f2f6ff',
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
    fontSize: 20,
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
  productContainer: {
    backgroundColor: '#eceff6',
    padding: 14,
    borderRadius: 10,
  },
  productText: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'BanglaFont',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#2980B9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  disabledButton: {
    backgroundColor: '#a6c8e0',
  },
  quantityButtonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'BanglaFont',
  },
  quantityValue: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: '500',
    fontFamily: 'BanglaFont',
    marginHorizontal: 20,
  },
  priceContainer: {
    marginLeft: 20,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  priceLabel: {
    fontSize: 14,
    color: '#34495E',
    fontFamily: 'BanglaFont',
  },
  priceValue: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
    fontFamily: 'BanglaFont',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BanglaFont',
  },
});
