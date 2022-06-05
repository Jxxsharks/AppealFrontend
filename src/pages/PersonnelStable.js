import React, { useEffect } from 'react'
import PrimarySearchAppBar from '../components/Appbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { Container, Typography,Paper } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import ScoreTable from '../components/ScoreTable'
import { Scale } from '@mui/icons-material'
const PersonnelStable = () => {

  const state = useSelector(state => state.userInfo.value)

  const [petitions, setPetition] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8000/personnel/petition/type:score/position:${state.positionid}`,
    {
      withCredentials: true,
      headers: {'Content-Type' : 'application/json'}
    })
    .then((res)=>{
      setPetition(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <>
        <PrimarySearchAppBar />
        <Container sx={{
          pt: 10,
          maxWidth:'90vw'
        }} maxWidth={false}>
          {petitions.length === 0 ? (
            <>
              <Paper sx={{
                display: 'flex',
                height: '50vh',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:'space-around'
              }}>
                <Typography variant='h2'>
                  ยังไม่มีรายการคำร้อง
                </Typography>
                <InfoIcon sx={{
                   width: 100,
                   height: 100
                }} />
              </Paper>
            </>
          )

          : <ScoreTable petitions={petitions} />}
          
        </Container>
    </>
  )
}

export default PersonnelStable