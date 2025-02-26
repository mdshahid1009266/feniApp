import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import axios from 'axios';
import { setContext } from '../../../context/userContext';

const categories = ['Bike', 'Furniture', 'Book', 'Electronics', 'Mobile', 'Others'];
const API_URL = 'http://192.168.0.102:2000/api/products';

const ProductForm = () => {
  const { isLogged, user } = setContext();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.price.trim()) newErrors.price = 'Price is required';
    if (isNaN(product.price) || Number(product.price) <= 0) newErrors.price = 'Invalid price';
    if (!product.category) newErrors.category = 'Category is required';
    if (product.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('sellerId', user._id);

    try {
      for (const uri of product.images) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          Alert.alert('Error', 'Image file not found');
          return;
        }

        const fileType = fileInfo.uri.split('.').pop();
        const response = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formData.append('images', {
          uri,
          name: `image_${Date.now()}.${fileType}`,
          type: `image/${fileType}`,
          data: response,
        });
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Product submitted successfully!');
        setProduct({
          name: '',
          price: '',
          description: '',
          category: '',
          images: []
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add product. Please check your connection.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
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

  return isLogged ? (
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
          style={[styles.input, { height: 100,textAlignVertical: 'top' }]}
          placeholder="Enter product description"
          multiline
          numberOfLines={4}
          value={product.description}
          onChangeText={(text) => setProduct({ ...product, description: text })}
        />
      </View>

      {/* Category Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCategories(!showCategories)}
        >
          <Text>{product.category || 'Select Category'}</Text>
        </TouchableOpacity>
        {showCategories && (
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => {
                  setProduct({ ...product, category });
                  setShowCategories(false);
                }}
              >
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}
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
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          {product.images.length < 3 && (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Ionicons name="add-circle-outline" size={32} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        {errors.images && <Text style={styles.error}>{errors.images}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator color="white" /> // Show loading indicator
        ) : (
          <Text style={styles.submitText}>Submit Product</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  ) : (
    <View style={styles.container1}>
      <Text style={styles.text1}>Please login or create an account to add a new product</Text>
      <Link href="/profile" style={styles.link1}>
        Login
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  text1: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    lineHeight: 24,
  },
  link1: {
    backgroundColor: '#007bff',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
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
    justifyContent: 'center', // for aligning ActivityIndicator
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  categoryButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ProductForm;