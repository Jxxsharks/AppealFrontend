import { Container,Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PrimarySearchAppBar from '../components/Appbar'
import ScoreTable from '../components/ScoreTable'
const StudentStable = () => {
  const [petitions, setPetition] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/student/petition/type:score",
    {
      withCredentials: true,
      headers: {'Content-Type' : 'application/json'}
    })
    .then((res) => {
      setPetition(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])


  return (
    <>
    <PrimarySearchAppBar />
    <Container  sx={{
      pt: 10,
      maxWidth: '90vw'
    }} maxWidth={false}>
       <ScoreTable petitions={petitions}/>
    </Container>
    
    </>
  )
}

export default StudentStable