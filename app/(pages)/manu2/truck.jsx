import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Alert, Modal, TouchableOpacity, Linking } from 'react-native';
import { setContext } from '../../../context/userContext';
import { createTruckOrder } from '../../api';

export default function TruckRentalScreen() {
  const { user } = setContext();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.number || '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    truckType: '',
    loadWeight: '',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});
  const [showTruckTypeModal, setShowTruckTypeModal] = useState(false);
  const truckTypes = ['মাঝারি ট্রাক', 'ভারি ট্রাক', 'কমার্শিয়াল ট্রাক'];

  const validateForm = () => {
    let newErrors = {};
    const phoneRegex = /^01\d{9}$/;

    if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'সঠিক ফোন নম্বর লিখুন';
    if (!formData.pickup.trim()) newErrors.pickup = 'পিকআপ লোকেশন প্রয়োজন';
    if (!formData.destination.trim()) newErrors.destination = 'গন্তব্য ঠিকানা প্রয়োজন';
    if (!formData.date) newErrors.date = 'তারিখ প্রয়োজন';
    if (!formData.time) newErrors.time = 'সময় প্রয়োজন';
    if (!formData.truckType) newErrors.truckType = 'ট্রাকের ধরন নির্বাচন করুন';
    if (!formData.loadWeight || isNaN(formData.loadWeight))
      newErrors.loadWeight = 'লোডের ওজন লিখুন';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  const openWhatsApp = async () => {
    const phoneNumber = '8801779481759';
    const message = 'হ্যালো, এটা আমার অ্যাপ থেকে একটি বার্তা।';
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(whatsappURL);

      if (supported) {
        await Linking.openURL(whatsappURL);
      } else {
        Alert.alert(
          'WhatsApp ইনস্টল করা নেই', 'WhatsApp ইনস্টল করুন বার্তা পাঠানোর জন্য।',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      Alert.alert(
        'কিছু ভুল হয়েছে। দয়া করে আবার চেষ্টা করুন।',
        [{ text: 'OK' }]
      );
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await createTruckOrder(formData);
      if (!response) {
        Alert.alert('Error', 'Failed to create order');
        return;
      }
      Alert.alert('বুকিং সফল!', 'আপনার বুকিংটি সফলভাবে সম্পন্ন হয়েছে');
      setFormData({
        name: '',
        phone: '',
        pickup: '',
        destination: '',
        date: '',
        time: '',
        truckType: '',
        loadWeight: '',
        specialRequest: ''
      });
    } catch (error) {
      console.error('Error creating car order:', error);
      Alert.alert('Error', 'Failed to create order');
      return;
    }
  };

  const renderTruckTypeSelector = () => (
    <Modal
      visible={showTruckTypeModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowTruckTypeModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {truckTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.modalOption, formData.truckType === type && styles.selectedModalOption]}
              onPress={() => {
                handleInputChange('truckType', type);
                setShowTruckTypeModal(false);
              }}
            >
              <Text style={[styles.modalOptionText, formData.truckType === type && styles.selectedModalOptionText]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setShowTruckTypeModal(false)}
          >
            <Text style={styles.modalCloseText}>বন্ধ করুন</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const [fontsLoaded] = useFonts({
    BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ট্রাক বুকিং ফর্ম</Text>

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

      {/* Truck Type Selector */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ট্রাকের ধরন *</Text>
        <TouchableOpacity
          style={[styles.input, styles.carTypeInput, errors.truckType && styles.errorInput]}
          onPress={() => setShowTruckTypeModal(true)}
        >
          <Text style={formData.truckType ? styles.carTypeSelectedText : styles.placeholderText}>
            {formData.truckType || 'ট্রাকের ধরন নির্বাচন করুন'}
          </Text>
        </TouchableOpacity>
        {errors.truckType && <Text style={styles.errorText}>{errors.truckType}</Text>}
        {renderTruckTypeSelector()}
      </View>

      {/* Load Weight */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>লোডের ওজন *</Text>
        <TextInput
          style={[styles.input, errors.loadWeight && styles.errorInput]}
          value={formData.loadWeight}
          onChangeText={(text) => handleInputChange('loadWeight', text)}
          placeholder="লোডের ওজন (kg)"
          keyboardType="numeric"
        />
        {errors.loadWeight && <Text style={styles.errorText}>{errors.loadWeight}</Text>}
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
        onPress={openWhatsApp}>
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
  carTypeInput: {
    justifyContent: 'center',
  },
  carTypeSelectedText: {
    color: '#2C3E50',
  },
  placeholderText: {
    color: '#95A5A6',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  selectedModalOption: {
    backgroundColor: '#F1F8FF',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'BanglaFont',
  },
  selectedModalOptionText: {
    color: '#2980B9',
    fontWeight: '500',
  },
  modalClose: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#E74C3C',
    fontWeight: '500',
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
