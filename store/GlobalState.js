import React from 'react';
import reducers from './Reducer';
import { getData } from '../utils/fetchData';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
    const initialState = { notify: {}, auth: {} };
    const [state, dispatch] = React.useReducer(reducers, initialState)

    React.useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin){
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem("firstLogin")
                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            });
        }
    }, [])

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}