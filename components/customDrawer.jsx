import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ScrollView, View, Text, Platform, Image, Pressable } from 'react-native';

// export default function CustomDrawerContent(props) {

//     const { bottom } = useSafeAreaInsets();
//     const navigation = useNavigation();

//     const closeDrawer = () => {
//         navigation.dispatch(DrawerActions.closeDrawer())
//     }
//     return (
//         <SafeAreaView>
//             <View >
//                 <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ padding: 0 }}>
//                     <View className="title bg-primary-500 px-5 py-20 rounded-b-xl">
//                         <Text className='text-centerr text-3xl font-bold font-[BanglaFont] text-white'>আমাদের ফেনী</Text>
//                         <Text className='text-centerr text-xl font-bold font-[BanglaFont] text-white'>শিক্ষা, সংস্কৃতি, ঐতিহ্য</Text>
//                     </View>
//                     <DrawerItemList {...props} />
//                 </DrawerContentScrollView>

//             </View>
//         </SafeAreaView>
//     )
// }


const CustomDrawerContent = (props) => {
    const [fontsLoaded] = useFonts({
        'BanglaFont': require('../assets/fonts/ShohidShafkatSamir.ttf'),
    });
    let bars = [];
    for (let i = 0; i < 100; i++) {
        bars.push(
            <View key={i} className="bars px-5">
                <Link href={"/instruction"} className='font-rubik-bold text-xl mt-4 text-black'>
                    <Image source={contributors} style={{ marginRight: 10, width: 30, height: 30 }} alt="manuBar" className="w-6 h-6 mr-3" />
                    <Text>Instruction</Text>
                </Link>
            </View>
        )
    }
    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled={true}
            contentContainerStyle={{ padding: 0 }}
        >
            {/* Drawer Header */}
            <View className="title bg-primary-500 px-5 py-20 rounded-b-xl">
                <Text className='text-centerr text-3xl font-bold font-[BanglaFont] text-white'>আমাদের ফেনী</Text>
                <Text className='text-centerr text-xl font-bold font-[BanglaFont] text-white'>শিক্ষা, সংস্কৃতি, ঐতিহ্য</Text>
            </View>


            {/* Default Drawer Items */}
            <DrawerItemList {...props} />


            {/* <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
                <TouchableOpacity
                    onPress={() => console.log('Logout pressed')}
                    style={{ paddingVertical: 10 }}
                >
                    <Text style={{ color: 'red' }}>Logout</Text>
                </TouchableOpacity>
            </View> */}
        </DrawerContentScrollView>
    );
};
export default CustomDrawerContent