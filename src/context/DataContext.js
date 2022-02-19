import React, { useEffect } from 'react';

const initialState = {
    data: [],
}

export const DataContext = React.createContext(initialState);

export const DataProvider = ({ children }) => {
    const [data, setData] = React.useState({});

    function updateDataFromLocalStorage() {
        console.log('updating data from local storage');
        const data = localStorage.getItem("events");

        if(data) {
            const parsedData = JSON.parse(data);
            setData(parsedData);
            console.log('data updated from local storage');
            return parsedData
        }
        
        console.log('data not updated from local storage');
        return null;
    }

    useEffect(() => {
        console.log("Fetching from local storage !")
        const result = updateDataFromLocalStorage();
        console.log("Fetching from local storage done !")
    }, [])

    return (
        <DataContext.Provider value={{data, updateDataFromLocalStorage}}>
            {children}
        </DataContext.Provider>
    )
}