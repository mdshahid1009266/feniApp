import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Define keys as constants
const STORAGE_KEY = 'userData';

// Utility function to handle errors and show alert
const handleError = (error) => {
    console.error('AsyncStorage Error:', error);
    // Show an alert with the error message
    Alert.alert(
        'Error',
        error.message || 'An unexpected error occurred.',
        [{ text: 'OK' }]
    );
    // Optional: You can log the error to a third-party service, like Sentry
    // Sentry.captureException(error);
};

// Storing data with error handling and alert
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
        handleError(e);
        throw new Error('Failed to save data');
    }
};
// Retrieving data with error handling and alert
const getData = async () => {
    try {
        const retrievedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (retrievedData !== null) {
            const parsedData = JSON.parse(retrievedData); // Convert the JSON string back to an object
            return parsedData;
        }
    } catch (e) {
        handleError(e);
        throw new Error('Failed to fetch data');
    }
};

// Optional: Clear storage (if needed)
const clearData = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        handleError(e);
        throw new Error('Failed to clear data');
    }
};

export { storeData, getData, clearData };
