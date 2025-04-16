import { View, Text, StyleSheet, Linking, Share } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import {
    Feather,
    AntDesign,
    MaterialIcons,
    Ionicons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
// import { useSafeAr } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
const CustomDrawerContent = (props) => {
    const pathname = usePathname();

    const [fontsLoaded] = useFonts({
        BanglaFont1: require("../../assets/fonts/ShohidShafkatSamir.ttf"),
        BanglaFont2: require("../../assets/fonts/ShohidShafkatSamir.ttf"),
    });

    useEffect(() => { }, [pathname]);

    // if (!fontsLoaded) return null; // Ensure fonts are loaded before rendering

    const openSocialLink = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error("Can't open URL:", url);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    const insets = useSafeAreaInsets();
    return (
        <DrawerContentScrollView
            {...props}
            style={{
                flex: 1, padding: 0,
                margin: 0
            }} // Add this
            contentContainerStyle={{
                flexGrow: 1,    // Add this
                padding: 0,
                margin: 0
            }}
        >
            <StatusBar
                backgroundColor="#000" // Set background color
                style="light" // Set text color (light-content for dark text, dark-content for light text) 
                hidden={false} // Show or hide the status bar (true to hide)
                translucent={false} // Set to true for semi-transparent status bar 
            />
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>আমাদের ফেনী</Text>
                <Text style={styles.drawerSubtitle}>শিক্ষা, সংস্কৃতি, ঐতিহ্য</Text>
            </View>

            {/* Join US */}
            <View className="bg-primary-50 border-y-2 border-gray-200 px-2">
                <Text className="text-lg font-bold mb-2">Join Us</Text>
                <View className="joinUsContainer">
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather
                                name="facebook"
                                size={size}
                            />
                        )}
                        label={"Facebook"}
                        labelStyle={[
                            styles.navItemLabel,
                        ]}
                        style={{
                            marginVertical: 0,
                        }}
                        onPress={() =>
                            Linking.openURL(
                                "https://www.facebook.com/profile.php?id=61572900792757"
                            )
                        }
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather
                                name="instagram"
                                size={size}
                            />
                        )}
                        label={"Instagram"}
                        labelStyle={[
                            styles.navItemLabel,
                        ]}
                        style={{
                            marginVertical: 0,
                        }}
                        onPress={() =>
                            Linking.openURL(
                                "https://instagram.com/YourPage"
                            )
                        }
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />
                </View>
            </View>
            {/* Contact US */}
            <View className="bg-primary-50 border-y-2 border-gray-200 px-2">
                <Text className="text-lg font-bold mb-2">Contact</Text>
                <View className="joinUsContainer">
                    {/* Call Action */}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="phone" size={size} color="#000" />
                        )}
                        label={"Call Us"}
                        labelStyle={styles.navItemLabel}
                        style={{ backgroundColor: "#fff", marginVertical: 0 }}
                        onPress={() => Linking.openURL("tel:01600190821")}
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />

                    {/* Message Action */}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="message-circle" size={size} color="#000" />
                        )}
                        label={"Send a Message"}
                        labelStyle={styles.navItemLabel}
                        style={{ backgroundColor: "#fff", marginVertical: 0 }}
                        onPress={() => Linking.openURL("sms:01600190821 ")}
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />

                    {/* Email Action */}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="mail" size={size} color="#000" />
                        )}
                        label={"Email Us"}
                        labelStyle={styles.navItemLabel}
                        style={{ backgroundColor: "#fff", marginVertical: 0 }}
                        onPress={() =>
                            Linking.openURL(
                                "mailto:palashmia654@gmail.com?subject=Inquiry&body=Hello, I would like to..."
                            )
                        }
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />
                </View>
            </View>
            {/* Others */}
            <View className="bg-primary-50 border-y-2 border-gray-200 px-2">
                <Text className="text-lg font-bold mb-2">Others</Text>
                <View className="joinUsContainer">
                    {/* Contributors */}
                    <DrawerItem
                        icon={({ size }) => <Feather name="users" size={size} color="#000" />}
                        label={"Contributors"}
                        labelStyle={styles.navItemLabel}
                        style={{ marginVertical: 0 }}
                        onPress={() => router.push("/contributors")} // Redirect to contributors page
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />

                    {/* Developer */}
                    <DrawerItem
                        icon={({ size }) => <Feather name="code" size={size} color="#000" />}
                        label="Developer"
                        labelStyle={styles.navItemLabel}
                        style={{ marginVertical: 0, backgroundColor: "transparent" }}
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                        onPress={() =>
                            Linking.openURL(
                                "https://mdshahid.netlify.app"
                            )
                        }
                    />

                    {/* Share */}
                    <DrawerItem
                        icon={({ size }) => <Feather name="share" size={size} color="#000" />}
                        label={"Share"}
                        labelStyle={styles.navItemLabel}
                        style={{ marginVertical: 0 }}
                        onPress={async () => {
                            try {
                                const result = await Share.share({
                                    message: "Check out this amazing app: https://example.com",
                                });
                                if (result.action === Share.sharedAction) {
                                    if (result.activityType) {
                                        console.log("Shared with activity type:", result.activityType);
                                    } else {
                                        console.log("Shared successfully!");
                                    }
                                } else if (result.action === Share.dismissedAction) {
                                    console.log("Share dismissed.");
                                }
                            } catch (error) {
                                console.error("Error sharing:", error.message);
                            }
                        }}
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />

                    {/* Rate Us */}
                    <DrawerItem
                        icon={({ size }) => <Feather name="star" size={size} color="#000" />}
                        label={"Rate Us"}
                        labelStyle={styles.navItemLabel}
                        style={{ marginVertical: 0 }}
                        onPress={() =>
                            Linking.openURL(
                                "https://play.google.com/store/apps/details?id=com.upokar.app" // Replace with your app's store URL
                            )
                        }
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />

                    {/* Privacy Policy */}
                    <DrawerItem
                        icon={({ size }) => <Feather name="file-text" size={size} color="#000" />}
                        label={"Privacy Policy"}
                        labelStyle={styles.navItemLabel}
                        style={{ marginVertical: 0 }}
                        onPress={() =>
                            Linking.openURL("https://example.com/privacy-policy") // Replace with your privacy policy URL
                        }
                        // Override the active/focused background style
                        activeBackgroundColor="transparent"
                        // On Android, remove ripple effect if it still appears.
                        pressColor="transparent"
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

export default function Layout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: "#fff",
                    padding: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                },
                sceneContainerStyle: { backgroundColor: "#fff" },
                drawerType: "front",
                swipeEdgeWidth: 0,
            }}
        >
            {/* Your drawer screens/components */}
        </Drawer>

    );
}

const styles = StyleSheet.create({
    drawerHeader: {
        padding: 20,
        backgroundColor: "#000",
        alignItems: "center",
        borderRadius: 20,
        marginBottom: 20,
    },
    drawerTitle: {
        fontSize: 32,
        fontFamily: "BanglaFont1",
        color: "#fff",
    },
    drawerSubtitle: {
        fontSize: 16,
        fontFamily: "BanglaFont2",
        color: "#fff",
    },
    navItemLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
