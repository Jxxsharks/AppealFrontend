import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import PrimarySearchAppBar from "../components/Appbar";
import { Box } from "@mui/system";
import PersonnelCards from "../components/PersonnelCards";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Petitionpersonnel = () => {

  const [personnels, SetPersonnels] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:8000/student/personnel',{
      withCredentials:true,
      headers:{'Content-Type':'application/json'}
    })
    .then((res) => {
      SetPersonnels(res.data.personnel)
      console.log(personnels)
    })
    .catch((err)=>{
      if(err.response.status === 401){
        navigate('/')
      }
    })
  },[])

  return (
    <>
      <PrimarySearchAppBar />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            mt: 10,
            ml: { xs: 20, sm: 1 },
          }}
        >
        {personnels.map((personnel) => (
          <PersonnelCards key={personnel.personnel_id} data={personnel}/>
        ))}
        </Box>
      </Container>
    </>
  );
};

export default Petitionpersonnel;
