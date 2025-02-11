import { Stack } from "expo-router"
import "./global.css"
import ContextProvider from "../context/userContext"
const _layout = () => {
    return (
        <ContextProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="(pages)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="pages/InfoPage" options={{ headerShown: true, title: 'Info', headerTitleAlign: 'left' }} /> */}
            </Stack>
        </ContextProvider>
    )
}

export default _layout 