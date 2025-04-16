import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Navbar from '@/components/navbar'
import Carousel from "../../../components/carousel"
// import Carousel from "../../../components/"
import Menu from "../../../components/options"
import { ScrollView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor="#000" // Set background color
                style="light" // Set text color (light-content for dark text, dark-content for light text) 
                hidden={false} // Show or hide the status bar (true to hide)
                translucent={false} // Set to true for semi-transparent status bar 
            />
            <View style={{ flex: 1 }} className='bg-blue-100'>
                <View>
                    <Navbar />
                </View>
                <View>
                    <Carousel />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 10 }} >
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                        <Menu />
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home