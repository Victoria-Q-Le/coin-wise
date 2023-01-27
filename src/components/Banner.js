import { Container, styled, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'


const BannerDiv = styled("div")({
    backgroundImage: 'url(./banner2.jpg)'
})

const BannerContainer = styled(Container)({
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: "space-around"
})

const TaglineDiv = styled("div")({
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center'
})

const Banner = () => {
  return (
    <BannerDiv>
        <BannerContainer>
          <TaglineDiv>
            <Typography variant='h2' style={{fontWeight: "bold", marginBottom: 15}}> Coin Wise </Typography>
            <Typography variant='subtitle2' style={{color : "darkgrey", textTransform: "capitalize"}}>one stop for all your crypto needs</Typography>
          </TaglineDiv>

          <Carousel />
        </BannerContainer>
    </BannerDiv>
  )
}

export default Banner
