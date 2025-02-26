import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    Button,
    FlatList,
    Alert // Import Alert from react-native
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { setContext } from "../context/userContext"; // Assuming you have a context for user data
import { updateUser } from "../app/api";
import { storeData } from "../app/localStorage";
const UserDashboard = () => {
    const { user, setUser } = setContext(); // Accessing user data from context
    const [userData, setUserData] = useState(user || {}); // Default to userData if available
    const [originalUserData, setOriginalUserData] = useState(user || {}); // Store original user data for comparison and reset

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentEditField, setCurrentEditField] = useState("");
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        if (user) {
            setUserData(user);
            setOriginalUserData(user); // Update original user data when context user changes
        }
    }, [user]);

    const handleEditField = (field, currentValue) => {
        setCurrentEditField(field);
        setEditValue(currentValue);
        setEditModalVisible(true);
    };

    const saveEdit = async () => {
        const updatedUserData = { ...userData, [currentEditField]: editValue };
        setUserData(updatedUserData); // Optimistically update local state
        setEditModalVisible(false);

        try {
            const data = await updateUser(updatedUserData);
            await storeData(data);
            setUser(data);
            Alert.alert(
                "Updated",
                "Your profile has been updated.",
                [{ text: "OK" }]
            );
        } catch (error) {
            // If there's a network error or any other exception, revert and show an error
            setUserData(originalUserData); // Revert to original data on error
            Alert.alert(
                "Update Failed",
                "Failed to update your profile. Please check your network and try again.",
                [{ text: "OK" }]
            );
            console.error('API error:', error);
        }
    };

    const renderEditModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => setEditModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        Edit {currentEditField.replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={editValue}
                        onChangeText={setEditValue}
                        autoFocus
                        keyboardType={
                            currentEditField === "email" ? "email-address" : "default"
                        }
                    />
                    <View style={styles.modalButtons}>
                        <Button
                            title="Cancel"
                            onPress={() => setEditModalVisible(false)}
                            color="#666"
                        />
                        <Button title="Save" onPress={saveEdit} color="#0984e3" />
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.userName}>{userData.name}</Text>
                <TouchableOpacity
                    style={styles.editProfileButton}
                    onPress={() => handleEditField("name", userData.name)}
                >
                    <Feather name="edit" size={18} color="#fff" />
                    <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="person-outline" size={24} color="#666" />
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{userData.email}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleEditField("email", userData.email)}
                    >
                        <Feather name="edit-2" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoLabel}>Phone Number</Text>
                        <Text style={styles.infoValue}>{userData.number}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleEditField("number", userData.number)}
                    >
                        <Feather name="edit-2" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={() => console.log("Navigate to change password screen")}
                >
                    <MaterialIcons name="lock-outline" size={20} color="#0984e3" />
                    <Text style={styles.changePasswordText}>Change Password</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="location-outline" size={24} color="#666" />
                    <Text style={styles.sectionTitle}>Address</Text>
                    <TouchableOpacity
                        onPress={() => handleEditField("address", userData.address)}
                    >
                        <Feather name="edit-2" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.addressText}>{userData.address}</Text>
            </View>

            {renderEditModal()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F8",
    },
    profileHeader: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    userName: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333",
    },
    editProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3664f4",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        gap: 8,
    },
    editProfileButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    sectionTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
    infoItem: {
        marginBottom: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoLabel: {
        color: "#666",
        fontSize: 14,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    },
    changePasswordButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        gap: 8,
    },
    changePasswordText: {
        color: "#0984e3",
        fontWeight: "500",
    },
    addressText: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        margin: 20,
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
    },
});

export default UserDashboard;