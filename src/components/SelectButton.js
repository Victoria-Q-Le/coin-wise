import { Button, styled } from '@mui/material'
import React from 'react'



const SelectButton = ({children, selected, onClick}) => {
    
  const SelectButtonSpan = styled(Button)({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    width: "22%",
    "&:hover": {
      backgroundColor: "gold",
      color: "black"
    }
  })

  return (
    <SelectButtonSpan onClick={onClick}>
      {children}
    </SelectButtonSpan> 
  )
}

export default SelectButton
