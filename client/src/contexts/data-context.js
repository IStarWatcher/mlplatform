import { createContext, useState } from 'react'
import axios from 'axios';

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [dataContext, setDataContext] = useState(null)

    const fetchData = async () => {
        // Получение данных с сервера
        const response = await axios.get('https://api.zotero.org/groups/2211939/collections/KHTHLKB5/items?v=3&include=bib,data&q=&itemType=-attachment || note&sort=date&start=0&limit=100')
        
        let dt = []
        for (let st of response.data)
            dt.push(st.data) 
        setDataContext(dt)
        
        console.log('get data ' + dt);
        console.log(typeof dt);
    }

    return (
        <DataContext.Provider value={{ dataContext, fetchData }}>
            {children}
        </DataContext.Provider>
    )
}