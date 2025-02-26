import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../app/localStorage"


const Context = createContext();

const ContextProvider = ({ children }) => {


    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                if (data) {
                    setUser(data);
                    setIsLogged(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [isLogged])
    return (
        <Context.Provider value={{ isLogged, setIsLogged, user, setUser }}>
            {children}
        </Context.Provider>
    )
}
export const setContext = () => useContext(Context)
export default ContextProvider


