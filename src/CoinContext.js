import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api'

const Coin = createContext()

const CoinContext = ({children}) => {

    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

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
        <Coin.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins}}>
            {children}
        </Coin.Provider>
    )
}
export default CoinContext

export const CoinState = () => {
    return useContext(Coin)
}
