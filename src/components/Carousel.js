import { styled } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
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

    console.log(trending);

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            const {data} = await axios.get(TrendingCoins(currency))
            setTrending(data)
        }

        fetchTrendingCoins()
    },[currency])

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0

        return(
            <Link to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height ='80' style={{marginBottom: 10}} />
                <span> {coin.symbol} &nbsp; <span>{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span> </span>
            </Link>
        )
    })

    const responsive ={
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }

    return (
        <CarouselDiv>
            <AliceCarousel 
                mouseTracking 
                infinite 
                autoPlayInterval ={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </CarouselDiv>
    )
}

export default Carousel
