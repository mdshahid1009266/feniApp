import { useFonts } from 'expo-font';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

const CylinderOrderPage = () => {
    const [fontsLoaded] = useFonts({
        BanglaFont: require("../../../assets/fonts/SolaimanLipi.ttf"),
    });
    const { rname } = useLocalSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        cylinderType: '',
        cylinderSize: '',
        quantity: '',
        specialRequest: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [showSizeModal, setShowSizeModal] = useState(false);

    const cylinderTypes = ['এলপিজি', 'সিএনজি', 'অক্সিজেন', 'অন্যান্য'];
    const cylinderSizes = ['৫ কেজি', '১০ কেজি', '১৪ কেজি', '২০ কেজি'];

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন';
        if (!/^01[3-9]\d{8}$/.test(formData.phone)) newErrors.phone = 'অবৈধ ফোন নম্বর';
        if (!formData.address.trim()) newErrors.address = 'ঠিকানা প্রয়োজন';
        if (!formData.date.trim()) newErrors.date = 'তারিখ প্রয়োজন';
        if (!formData.time.trim()) newErrors.time = 'সময় প্রয়োজন';
        if (!formData.cylinderType) newErrors.cylinderType = 'ধরন নির্বাচন করুন';
        if (!formData.cylinderSize) newErrors.cylinderSize = 'আকার নির্বাচন করুন';
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = 'অবৈধ পরিমাণ';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'শর্তাবলী গ্রহণ করুন';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        let newData = formData;
        newData.rname = rname;

        if (validateForm()) {
            Alert.alert('অর্ডার সফল!', 'আপনার সিলিন্ডার অর্ডার সফলভাবে সম্পন্ন হয়েছে');
            console.log('Form Submitted:', formData);
        }
    };

    const renderInput = (label, field, placeholder, isPicker = false, onPress) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[
                    styles.input,
                    isPicker && styles.pickerInput,
                    errors[field] && styles.errorInput
                ]}
                onPress={onPress}
                disabled={!isPicker}
            >
                {isPicker ? (
                    <Text style={formData[field] ? styles.inputText : styles.placeholder}>
                        {formData[field] || placeholder}
                    </Text>
                ) : (
                    <TextInput
                        style={styles.inputText}
                        placeholder={placeholder}
                        value={formData[field]}
                        onChangeText={(text) => handleInputChange(field, text)}
                        placeholderTextColor="#999"
                    />
                )}
            </TouchableOpacity>
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

                {/* Separate Date and Time Inputs */}
                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        {renderInput('তারিখ', 'date', 'DD/MM/YYYY')}
                    </View>
                    <View style={styles.halfInput}>
                        {renderInput('সময়', 'time', 'HH:MM AM/PM')}
                    </View>
                </View>

                {renderInput(
                    'সিলিন্ডারের ধরন',
                    'cylinderType',
                    'প্রকার নির্বাচন করুন',
                    true,
                    () => setShowTypeModal(true)
                )}

                {renderInput(
                    'সিলিন্ডারের আকার',
                    'cylinderSize',
                    'আকার নির্বাচন করুন',
                    true,
                    () => setShowSizeModal(true)
                )}

                {renderInput('পরিমাণ', 'quantity', 'সিলিন্ডারের সংখ্যা')}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>বিশেষ অনুরোধ</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="কোন বিশেষ অনুরোধ থাকলে লিখুন"
                        multiline
                        numberOfLines={4}
                        value={formData.specialRequest}
                        onChangeText={(text) => handleInputChange('specialRequest', text)}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={[styles.checkboxContainer, errors.termsAccepted && styles.errorBorder]}>
                    <TouchableOpacity
                        style={[styles.checkbox, formData.termsAccepted && styles.checkedBox]}
                        onPress={() => {
                            handleInputChange('termsAccepted', !formData.termsAccepted)
                        }}
                    >
                        {formData.termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={styles.termsText}>আমি
                        <Link href="terms" style={styles.termsLink}> শর্তাবলী </Link>
                        মেনে নিচ্ছি
                    </Text>
                </View>
                {errors.termsAccepted && (
                    <Text style={[styles.errorText, { marginTop: -8 }]}>{errors.termsAccepted}</Text>
                )}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>অর্ডার নিশ্চিত করুন</Text>
                </TouchableOpacity>

                {/* Modals */}
                <Modal visible={showTypeModal} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={cylinderTypes}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => {
                                            handleInputChange('cylinderType', item);
                                            setShowTypeModal(false);
                                        }}
                                    >
                                        <Text style={styles.modalText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal visible={showSizeModal} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={cylinderSizes}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => {
                                            handleInputChange('cylinderSize', item);
                                            setShowSizeModal(false);
                                        }}
                                    >
                                        <Text style={styles.modalText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeafe',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'BanglaFont',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 8,
        fontFamily: 'BanglaFont',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        fontFamily: 'BanglaFont',
    },
    inputText: {
        color: '#2d3436',
        fontSize: 16,
    },
    placeholder: {
        color: '#b2bec3',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -5,
    },
    halfInput: {
        width: '48%',
        marginHorizontal: 5,
    },
    pickerInput: {
        justifyContent: 'center',
    },
    errorInput: {
        borderColor: '#e74c3c',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
        marginTop: 4,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        backgroundColor: 'white',
        fontFamily: 'BanglaFont',

    },
    errorBorder: {
        borderColor: '#e74c3c',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#b2bec3',
        borderRadius: 6,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'BanglaFont',
    },
    checkedBox: {
        backgroundColor: '#3498db',
        borderColor: '#3498db',
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    termsText: {
        fontSize: 14,
        color: '#2d3436',
    },
    submitButton: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#3498db',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'BanglaFont',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '50%',
        padding: 20,
    },
    modalItem: {
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    modalText: {
        fontSize: 16,
        color: '#2d3436',
    },
    termsLink: {
        color: '#3498db',
        textDecorationLine: 'none',
        fontWeight: 600,
    },
});


export default CylinderOrderPage;