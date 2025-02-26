import { useFonts } from 'expo-font';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { setContext } from '../../../context/userContext';
import { createCylinderOrder } from '../../api';

const CylinderOrderPage = () => {
    const { gname, gprice } = useLocalSearchParams();
    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
    });
    const { user } = setContext();
    
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.number || '',
        address: user?.address || '',
        date: '',
        specialRequest: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const price = parseInt(gprice) || 0;
        setTotalPrice(price * quantity);
    }, [quantity, gprice]);

    const convertBanglaToArabic = (input) => {
        const banglaDigits = '০১২৩৪৫৬৭৮৯';
        return input.split('').map(char => 
            banglaDigits.indexOf(char) > -1 ? banglaDigits.indexOf(char) : char
        ).join('');
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন';
        if (!/^01[3-9]\d{8}$/.test(formData.phone)) newErrors.phone = 'অবৈধ ফোন নম্বর';
        if (!formData.address.trim()) newErrors.address = 'ঠিকানা প্রয়োজন';
        if (!formData.date.trim()) newErrors.date = 'তারিখ প্রয়োজন';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'শর্তাবলী গ্রহণ করুন';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleQuantityChange = (operation) => {
        setQuantity(prev => {
            if (operation === 'increment' && prev < 100) return prev + 1;
            if (operation === 'decrement' && prev > 1) return prev - 1;
            return prev;
        });
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        try {
            const orderData = {
                ...formData,
                cname: gname,
                quantity: quantity.toString(),
                totalPrice: totalPrice.toString()
            };
            
            const response = await createCylinderOrder(orderData);
            if (response) {
                Alert.alert('আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে');
                setFormData(prev => ({
                    ...prev,
                    date: '',
                    time: '',
                    specialRequest: '',
                    termsAccepted: false
                }));
                setQuantity(1);
            }
        } catch (error) {
            Alert.alert('ত্রুটি', 'অর্ডার তৈরি করতে ব্যর্থ হয়েছে');
        }
    };

    const renderInput = (label, field, placeholder) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, errors[field] && styles.errorInput]}
                placeholder={placeholder}
                value={formData[field]}
                onChangeText={(text) => setFormData(prev => ({...prev, [field]: text}))}
                placeholderTextColor="#999"
            />
            {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>সিলিন্ডার অর্ডার ফর্ম</Text>

                {renderInput('নাম', 'name', 'আপনার পুরো নাম লিখুন')}
                {renderInput('ফোন নম্বর', 'phone', '01XXXXXXXXX')}
                {renderInput('ঠিকানা', 'address', 'সম্পূর্ণ ঠিকানা লিখুন')}

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        {renderInput('তারিখ', 'date', 'DD/MM/YYYY')}
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>সিলিন্ডারের পরিমাণ</Text>
                    <View style={styles.quantityContainer}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity 
                                style={styles.counterButton}
                                onPress={() => handleQuantityChange('decrement')}
                            >
                                <Text style={styles.counterText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity 
                                style={styles.counterButton}
                                onPress={() => handleQuantityChange('increment')}
                            >
                                <Text style={styles.counterText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.priceText}>
                            মোট মূল্য: ৳{totalPrice.toLocaleString('bn-BD')}
                        </Text>
                    </View>
                    <Text style={styles.noteText}>(প্রতি ১২ কেজি সিলিন্ডারের মূল্য: {parseInt(gprice || 0).toLocaleString('bn-BD')})</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>বিশেষ অনুরোধ</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="বিশেষ অনুরোধ বা নির্দেশনা লিখুন"
                        multiline
                        numberOfLines={4}
                        value={formData.specialRequest}
                        onChangeText={(text) => setFormData(prev => ({...prev, specialRequest: text}))}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={[styles.checkboxContainer, errors.termsAccepted && styles.errorBorder]}>
                    <TouchableOpacity
                        style={[styles.checkbox, formData.termsAccepted && styles.checkedBox]}
                        onPress={() => setFormData(prev => ({...prev, termsAccepted: !prev.termsAccepted}))}
                    >
                        {formData.termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                        আমি <Link href="terms" style={styles.termsLink}>শর্তাবলী</Link> মেনে নিচ্ছি
                    </Text>
                </View>
                {errors.termsAccepted && <Text style={styles.errorText}>{errors.termsAccepted}</Text>}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>অর্ডার নিশ্চিত করুন</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a365d',
        textAlign: 'center',
        marginBottom: 25,
        fontFamily: 'BanglaFont',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 8,
        fontFamily: 'BanglaFont',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontFamily: 'BanglaFont',
    },
    errorInput: {
        borderColor: '#e53e3e',
    },
    errorText: {
        color: '#e53e3e',
        fontSize: 14,
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    halfInput: {
        flex: 1,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    counterButton: {
        backgroundColor: '#4299e1',
        borderRadius: 6,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        fontFamily: 'BanglaFont',
    },
    priceText: {
        fontSize: 16,
        color: '#2d3748',
        fontFamily: 'BanglaFont',
    },
    noteText: {
        fontSize: 14,
        color: '#718096',
        marginTop: 5,
        fontFamily: 'BanglaFont',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: 'white',
    },
    errorBorder: {
        borderColor: '#e53e3e',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: '#cbd5e0',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: '#4299e1',
        borderColor: '#4299e1',
    },
    checkmark: {
        color: 'white',
        fontSize: 14,
    },
    termsText: {
        fontSize: 14,
        color: '#4a5568',
        fontFamily: 'BanglaFont',
    },
    termsLink: {
        color: '#4299e1',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#4299e1',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'BanglaFont',
    },
});

export default CylinderOrderPage;