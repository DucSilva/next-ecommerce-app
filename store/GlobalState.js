import React from 'react';
import reducers from './Reducer';
import { getData } from '../utils/fetchData';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
    const initialState = { notify: {}, auth: {}, cart: [] };
    const [state, dispatch] = React.useReducer(reducers, initialState)

    const { cart } = state;
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
    }, []);

    React.useEffect(() => {
        const __next__cart__devmd = JSON.parse(localStorage.getItem('__next__cart__devmd'));
        if(__next__cart__devmd) dispatch({ type: 'ADD_CART', payload: __next__cart__devmd })
    }, [])

    React.useEffect(() => {
        localStorage.setItem('__next__cart__devmd', JSON.stringify(cart));
    }, [cart])


    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}