import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    images: []
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.price.trim()) newErrors.price = 'Price is required';
    if (isNaN(product.price) || Number(product.price) <= 0) newErrors.price = 'Invalid price';
    if (product.images.length === 0) newErrors.images = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission here
      Alert.alert('Success', 'Product submitted successfully!');
      console.log('Product Data:', product);
    }
  };

  const pickImage = async () => {
    if (product.images.length >= 3) {
      Alert.alert('Limit Reached', 'You can upload maximum 3 images');
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Need camera roll access to upload images');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }));
    }
  };

  const removeImage = (index) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Product</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      </View>

      {/* Price Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={product.price}
          onChangeText={(text) => setProduct({ ...product, price: text })}
        />
        {errors.price && <Text style={styles.error}>{errors.price}</Text>}
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter product description"
          multiline
          value={product.description}
          onChangeText={(text) => setProduct({ ...product, description: text })}
        />
      </View>

      {/* Image Upload Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Images (Max 3)</Text>
        <View style={styles.imageContainer}>
          {product.images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <MaterialIcons name="cancel" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          {product.images.length < 3 && (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <MaterialIcons name="add-a-photo" size={32} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        {errors.images && <Text style={styles.error}>{errors.images}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#dbeafe',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 2,
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderColor: '#666',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductForm;