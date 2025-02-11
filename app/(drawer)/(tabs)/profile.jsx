import { View, Text } from 'react-native'
import { setContext } from "../../../context/userContext"
import Login from "../../../components/login"
import About from "../../../components/about"
const profile = () => {
    const { isLogged, setIsLogged, user, setUser } = setContext();
    console.log(isLogged);
    
    return isLogged ? <About /> : <Login />
}
export default profile