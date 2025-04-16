import { Stack } from "expo-router"
import "./global.css"
import ContextProvider from "../context/userContext"
import { StatusBar } from "expo-status-bar"
const _layout = () => {
    return (
        <ContextProvider>
            <StatusBar
                backgroundColor="#000" // Set background color
                style="light" // Set text color (light-content for dark text, dark-content for light text) 
                hidden={false} // Show or hide the status bar (true to hide)
                translucent={false} // Set to true for semi-transparent status bar 
            />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="(pages)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="pages/InfoPage" options={{ headerShown: true, title: 'Info', headerTitleAlign: 'left' }} /> */}
            </Stack>
        </ContextProvider>
    )
}

export default _layout 