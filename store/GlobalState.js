import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import { getData } from '../utils/fetchData'


export const DataContext = createContext()


export const DataProvider = ({children}) => {
    const initialState = { 
        notify: {}, auth: {}, cart: [], modal: [], orders: [], users: [], categories: [], wallet: 0
    }

    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart, auth, wallet } = state

    useEffect(() => {
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
    
                // Fetch wallet data after authentication
                if(res.access_token){
                    getData('wallet', res.access_token)
                    .then(res => {
                        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                        
                        dispatch({type: 'UPDATE_WALLET', payload: res.balance})
                    })
                }
            })
        }
    
        // Fetch categories data
        getData('categories').then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
    
            dispatch({ 
                type: "ADD_CATEGORIES",
                payload: res.categories
            })
        })
    
        // Fetch cart data from local storage
        const __next__cart01__devat = JSON.parse(localStorage.getItem('__next__cart01__devat'))
        if(__next__cart01__devat) dispatch({ type: 'ADD_CART', payload: __next__cart01__devat })
    
        // Fetch orders and users data if authenticated
        if(auth.token){
            getData('order', auth.token)
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                
                dispatch({type: 'ADD_ORDERS', payload: res.orders})
            })
    
            if(auth.user.role === 'admin'){
                getData('user', auth.token)
                .then(res => {
                    if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                
                    dispatch({type: 'ADD_USERS', payload: res.users})
                })
            }
        }else{
            dispatch({type: 'ADD_ORDERS', payload: []})
            dispatch({type: 'ADD_USERS', payload: []})
        }
    }, [auth.token]) // Add auth.token as dependency
    

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}