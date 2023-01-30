import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CoinList} from '../config/api'
import { CoinState } from '../CoinContext'

const CoinTable = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  
  const {currency} = CoinState()


  console.log(coins);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      const {data} = await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
    }
    fetchCoins()
  }, [currency])

  return (
    <div>
      This is the coin table 
    </div>
  )
} 

export default CoinTable
