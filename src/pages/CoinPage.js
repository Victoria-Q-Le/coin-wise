import { styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CoinState} from '../CoinContext'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import parse from 'html-react-parser'


const DivContainer = styled("div")(({theme}) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center"
    }
}))

const DivSideBar = styled("div")(({theme})=> ({
    width: "30%",
    [theme.breakpoints.down("md")]:{
        width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
}))

const HeadingTypography = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 20
})

const DescriptionTypography = styled(Typography)({

})


const CoinPage = () => {
    const {id} = useParams() 
    
    const [coin, setCoin] = useState()
    const [description, setDescription] = useState("")
    
    const {currency, symbol} = CoinState()

    useEffect(() => {
        const fetchCoin = async () => {
            const {data} = await axios.get(SingleCoin(id))
            setCoin(data)
            setDescription(data.description.en.split(". ", [1]).toString()) //split the description to shorten the description, then convert it into string to parse later
        }
        fetchCoin()
    },[id])

    console.log(coin);
    console.log(typeof(description), description)
    console.log(currency, symbol)
     

    return (
        <DivContainer>
            <DivSideBar>
                <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20}} />
                <HeadingTypography variant='h3'>{coin?.name}</HeadingTypography>
                <DescriptionTypography variant='subtitle1'> {parse(description)} </DescriptionTypography>
            </DivSideBar>
            {/* END OF SIDE BAR */}

            <CoinInfo coin={coin}/>
        </DivContainer>
    )
}

export default CoinPage
