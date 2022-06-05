import React, {useEffect, useRef} from 'react'
import { Card } from '@mui/material'
import VanillaTilt from 'vanilla-tilt';
function Cards() {
    const tilt = useRef(null)
 
   const  options = {
      scale: 1.1,
      speed: 500,
      transition: true,
   }
  useEffect(() => {
    VanillaTilt.init(tilt.current, options)
  }, [options])
  return (
    <Card 
    sx={{
      width: 500
    }}
    ref={tilt}
    />
        
  )
}

export default Cards