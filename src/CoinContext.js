import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api'
import { auth } from './config/firebase'

const Coin = createContext()

const CoinContext = ({children}) => {

    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success"
    })

    useEffect(() => {
        onAuthStateChanged(auth, user => {
           if(user){setUser(user)}
           else {setUser(null)}
        })
    },[])

    const fetchCoins = async () => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
      }


    useEffect(() => {
        if (currency === "USD") setSymbol("$")
        else if (currency === "VND") setSymbol("Đ")
    }, [currency])

    return (
        <Coin.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user}}>
            {children}
        </Coin.Provider>
    )
}
export default CoinContext

export const CoinState = () => {
    return useContext(Coin)
}
