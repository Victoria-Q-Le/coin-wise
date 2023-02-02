import { styled } from '@mui/material'
import React from 'react'



const SelectButton = ({children, selected, onCLick}) => {
    
  const SelectButtonSpan = styled("span")(({theme}) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    colors: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    width: "22%",
    "&:hover": {
      backgroundColor: "gold",
      colors: "black"
    }
  }))

  return (
    <SelectButtonSpan>
      {children}
    </SelectButtonSpan> 
  )
}

export default SelectButton
