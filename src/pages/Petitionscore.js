import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import PrimarySearchAppBar from "../components/Appbar";
import { Box } from "@mui/material";
import ScoreCards from "../components/ScoreCards";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Petitionscore() {
  const navigate = useNavigate();
  const [subjects, Setsubjects] = useState([])

  useEffect(() => {
     axios.get('http://localhost:8000/student/subjects',
    {
      withCredentials:true,
      headers: { "Content-Type": "application/json" },
    }
    )
    .then((res) =>{

      Setsubjects(res.data.subject)

    }).catch(err=>{
      console.log(err.response.status)
      if(err.response.status === 401 ){
        navigate('/')
      }
    }
      )
  }, [])
  return (
    <>
      <PrimarySearchAppBar />
      <Container>
        <Box
        sx={{
          display:'flex',
          flexWrap: "wrap",
          gap:5,
          mt:10,
          ml:{xs: 20, sm: 2},
        }}>
         {subjects.map((subject)=>(
           <ScoreCards key={subject.id} data={subject} />
         ))}
      
        </Box>
      </Container>
    </>
  );
}

export default Petitionscore;
