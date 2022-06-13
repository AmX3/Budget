import { createContext, useState } from "react";

export const UsernameContext = createContext();

const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    // Wrapper
    const data = { username, setUsername };

    return (
        <UsernameContext.Provider value={data}>
            {children}
        </UsernameContext.Provider>
    );
};

export default UsernameProvider;
