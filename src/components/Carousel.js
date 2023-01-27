import { styled } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CoinState} from '../CoinContext'
import {TrendingCoins} from '../config/api'

const CarouselDiv = styled("div")(({theme}) => ({
    height: '50%',
    display: 'flex',
    alignItems: 'center'
}))
const Carousel = () => {

    const [trending, setTrending] = useState([])

    const {currency} = CoinState()

    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins()
    },[currency])

    return (
        <CarouselDiv>
            Carousel
        </CarouselDiv>
    )
}

export default Carousel
