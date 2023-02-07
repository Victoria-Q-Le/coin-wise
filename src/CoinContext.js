import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api'
import { auth,db } from './config/firebase'

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
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid)
            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()){
                    setWatchlist(coin.data().coins)
                } else {
                    console.log("No item in Watch list");
                }
            })
            return () => {
                unsubscribe()
            }
        }
    }, [user])

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
        <Coin.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist}}>
            {children}
        </Coin.Provider>
    )
}
export default CoinContext

export const CoinState = () => {
    return useContext(Coin)
}
