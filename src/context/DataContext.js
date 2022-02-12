import React, { useEffect } from 'react';

const initialState = {
    data: [],
}

export const DataContext = React.createContext(initialState);

export const DataProvider = ({ children }) => {
    const [data, setData] = React.useState({});

    function updateDataFromLocalStorage() {
        const data = localStorage.getItem("events");

        if(data) {
            setData(JSON.parse(data));
        }
    }

    useEffect(() => {
        updateDataFromLocalStorage();
    }, [])

    return (
        <DataContext.Provider value={{data, updateDataFromLocalStorage}}>
            {children}
        </DataContext.Provider>
    )
}