import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
    Modal,
    TextInput,
    Button,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const UserDashboard = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        address: "123 Main Street, New York, USA",
        profileImage: require('../assets/images/menu/profile.png'),

    });

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentEditField, setCurrentEditField] = useState("");
    const [editValue, setEditValue] = useState("");

    const orders = [
        { id: "1", date: "2023-08-15", total: "$149.99", status: "Delivered" },
        { id: "2", date: "2023-08-10", total: "$89.99", status: "Processing" },
        { id: "3", date: "2023-08-05", total: "$199.99", status: "Cancelled" },
    ];

    const handleEditField = (field, currentValue) => {
        setCurrentEditField(field);
        setEditValue(currentValue);
        setEditModalVisible(true);
    };

    const saveEdit = () => {
        setUser({ ...user, [currentEditField]: editValue });
        console.log(`Updated ${currentEditField} to:`, editValue);
        setEditModalVisible(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUser({ ...user, profileImage: { uri: result.assets[0].uri } });
            console.log("Updated profile image");
        }
    };

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => console.log("Viewing order details:", item.id)}
        >
            <View>
                <Text style={styles.orderId}>Order #${item.id}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <View style={styles.orderRight}>
                <Text style={styles.orderTotal}>{item.total}</Text>
                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor:
                                item.status === "Delivered"
                                    ? "#4CAF50"
                                    : item.status === "Processing"
                                        ? "#FF9800"
                                        : "#F44336",
                        },
                    ]}
                >
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

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
                <TouchableOpacity onPress={pickImage}>
                    <Image source={user.profileImage} style={styles.profileImage} />
                    {/* <View style={styles.cameraIcon}>
                        <Feather name="camera" size={24} color="white" />
                    </View> */}
                </TouchableOpacity>
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity
                    style={styles.editProfileButton}
                    onPress={() => handleEditField("name", user.name)}
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
                        <Text style={styles.infoValue}>{user.email}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleEditField("email", user.email)}
                    >
                        <Feather name="edit-2" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoLabel}>Phone Number</Text>
                        <Text style={styles.infoValue}>{user.phone}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleEditField("phone", user.phone)}
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
                        onPress={() => handleEditField("address", user.address)}
                    >
                        <Feather name="edit-2" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.addressText}>{user.address}</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="cube-outline" size={24} color="#666" />
                    <Text style={styles.sectionTitle}>Recent Orders</Text>
                </View>
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                />
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
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
        backgroundColor: "",
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
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    orderRight: {
        alignItems: "flex-end",
        gap: 4,
    },
    orderId: {
        fontWeight: "500",
        color: "#333",
    },
    orderDate: {
        color: "#666",
        fontSize: 14,
    },
    orderTotal: {
        fontWeight: "600",
        color: "#333",
    },
    statusBadge: {
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "500",
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
