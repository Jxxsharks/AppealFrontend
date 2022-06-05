import React, {useEffect, useRef} from "react";
import { Card, CardActions, CardContent ,Typography } from "@mui/material";
import AppealButton from "./AppealButton";
import VanillaTilt from 'vanilla-tilt';
import { Link } from 'react-router-dom'

export default function ScoreCards(props) {
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
    <>
    <Card sx={{ 
      width: 200, 
      pb:3,
      background:"#FEF2E8",
       }}
       ref={tilt}
      >
      <CardContent sx={{mb: 0.1}}>
        <Typography gutterBottom variant="h4" component="div" align="center">
          {props.data.subject_id}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {`ชื่อวิชา: ${props.data.subject_name}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          ชื่ออาจารย์ประจำวิชา
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {`${props.data.personnel.first_name} ${props.data.personnel.last_name}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display:'flex',
          justifyContent:'center'
          }}
      >
      <Link
        style={{textDecoration:'none'}}
        to={`${props.data.id}`}
      >

        <AppealButton text="ยื่นคำร้อง"/>
      </Link>
      </CardActions>
    </Card>
    </>
  );
}


