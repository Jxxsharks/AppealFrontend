import React from 'react'
import { Box } from "@mui/system";
import Styled from 'styled-components'
function Gear() {
  return (
    <Box sx={{
        mt:'5em',
        display:'flex',
        justifyContent:'center',
        }}>
        <Img alt="gear logo" src={require('../images/gear-logo.jpg')}></Img>
      </Box>
  )
}
const Img = Styled.img`
  max-width:  100px;
  height: 100px;
  margin-top: 1rem;
`
export default Gear