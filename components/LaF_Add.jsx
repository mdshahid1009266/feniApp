import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'http://192.168.0.102:2000/uploadLostPersonImage'; // update with your backend endpoint

const PeopleLostForm = () => {
  const [person, setPerson] = useState({
    number: '', // Changed from name to number
    description: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!person.number.trim()) newErrors.number = 'Number is required'; // Updated validation
    if (!person.description.trim()) newErrors.description = 'Description is required';
    if (!person.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your photo library.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setPerson(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('number', person.number); // Changed from name to number
    formData.append('description', person.description);

    try {
      const fileInfo = await FileSystem.getInfoAsync(person.image);
      if (!fileInfo.exists) {
        Alert.alert('Error', 'Image file not found');
        setLoading(false);
        return;
      }
      const fileType = person.image.split('.').pop();
      formData.append('image', {
        uri: person.image,
        name: `lost_${Date.now()}.${fileType}`,
        type: `image/${fileType}`,
      });
      
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.data.success) {
        Alert.alert('Success', 'Lost person information submitted successfully!');
        setPerson({ number: '', description: '', image: null });
      } else {
        Alert.alert('Error', response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.message || 'Submission failed. Please check your connection.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number</Text> {/* Updated label */}
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          value={person.number} // Changed from name to number
          onChangeText={(text) => setPerson({ ...person, number: text })}
          keyboardType="phone-pad"
        />
        {errors.number && <Text style={styles.error}>{errors.number}</Text>} {/* Updated error */}
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
          value={person.description}
          onChangeText={(text) => setPerson({ ...person, description: text })}
        />
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}
      </View>

      {/* Image Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Upload Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {person.image ? (
            <Image source={{ uri: person.image }} style={styles.image} />
          ) : (
            <Ionicons name="camera" size={40} color="#666" />
          )}
        </TouchableOpacity>
        {errors.image && <Text style={styles.error}>{errors.image}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitText}>Submit Report</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    minWidth: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  imagePicker: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});

export default PeopleLostForm;
