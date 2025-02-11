import { createContext, useContext, useEffect, useState } from "react";


const Context = createContext();

const ContextProvider = ({ children }) => {


    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({
        name: 'abc',
        phone: '01779481759',
        address: 'xyz,zyz'
    });

    // const [isLogged, setIsLogged] = useState(false);
    // const [user, setUser] = useState(null);


    useEffect(() => {

    }, user)
    return (
        <Context.Provider value={{ isLogged, setIsLogged, user, setUser }}>
            {children}
        </Context.Provider>
    )
}
export const setContext = () => useContext(Context)
export default ContextProvider


