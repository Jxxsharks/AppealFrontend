import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Appbar";
import Gear from "../components/Gear";
import Petitiondata from "../components/Petitiondata";
import {
  CssBaseline,
  Container,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import PetitionDetail from "../components/PetitionDetail";
import PetitionReason from "../components/PetitionReason";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";


function getSteps() {
  return ["ข้อมูลผู้ยื่นคำร้อง", "รายละเอียดคำร้อง", "เหตุผล/รายละเอียด"];
}

const defaultValues = {
  gpax: 0,
  semester: 2,
  year: new Date().getFullYear() + 543,
  rScore: "ข้อสอบกลางภาค",
  other: "",
  reason: ""
}


const StudentForm = () => {
  
  const navigate = useNavigate()
  const { subject_id } = useParams()
  const [success, setSuccess] = useState(null)
  const { control, watch } = useForm( {defaultValues} )
  

  useEffect(() =>{
    axios.get(`http://localhost:8000/student/subjects/${subject_id}`,
    {
      headers: {'Content-Type':'application/json'},
      withCredentials: true
    }
    )
    .then((res) => {
      setData((prevdata) => ({
        ...prevdata,
        "subjectID" : res.data.subject_id,
        "subjectName" : res.data.subject_name,
        "pname": res.data.personnel_name,
        "pid": res.data.personnel_id
      }))
    })
    .catch((err) => {
      if(err.response.status !== 200){
        navigate("/")
      }
    })
  }, [])
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    reason:"",
    subjectID:"",
    subjectName:"",
    pname:"",
    pid:0
  });
  
  const [error, setError] = useState({
    gpax: true,
    year: false,
  });


  const steps = getSteps();

  const HandleSubmit = async() => {
    
    await axios.post("http://localhost:8000/student/petition",
    {
      petition_type: "score",
      petition_subject: "ตรวจสอบระดับคะแนน",
      score_type: watch("rScore") !== "อื่นๆ" ? watch("rScore") : watch("other"),
      detail: watch("reason"),
      gpax: parseFloat(watch("gpax")),
      semester: watch("semester").toString(),
      year: watch("year").toString(),
      subject_id: parseInt(subject_id),
    },{
      withCredentials: true,
      headers: {'Content-Type':'application/json'}
    })
    .then((res) => {     
      setSuccess(res.status)    
    })
    .catch((err) => {
      console.log(err)
    })

  }

  const HandleNext = () => {
    if(activeStep === 2){
      HandleSubmit()
    }
    setActiveStep(activeStep + 1);
  };

  const HandleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const HandleData = (e) => {
    HandleErr(e);
  };

  const HandleErr = (e) => {
    if (e.target.name === "gpax") {
      
      const pattern = new RegExp("^[0-4].[0-9]{2}$");
      setError((preverr) => ({
        ...preverr,
        [e.target.name]: !pattern.test(e.target.value)
          ? true
          : parseFloat(e.target.value) <= 0 || parseFloat(e.target.value) > 4,
      }));
    } 
    else if(e.target.name === "year"){
      
        const diff = (parseInt(new Date().getFullYear() + 543 )) - parseInt(e.target.value)
        const pattern = new RegExp("[0-9]");
        setError((preverr) => ({
          ...preverr,
          [e.target.name]:!pattern.test(e.target.value)? true : diff > 1 || diff < 0
        }))
    }
    
  };

  const CheckError = (step) => {
    switch (step) {
      case 0:
        return error.gpax;
      case 1:
        
        return error.year ? true : watch("rScore") !== "อื่นๆ"? false : watch("other") === "";
      case 2:
        return watch("reason") === ""
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Petitiondata
           control = {control}
            gpax={data.gpax}
            err={error.gpax}
            handleChange={HandleData}
          />
        );
      case 1:
        return (
          <PetitionDetail
           control = {control}        
           data={data}
           rScore={watch("rScore")} 
           other={watch("other")} 
           err={error}
           handleChange={HandleData}
          />
          ) 
      case 2:
        return (
          <PetitionReason 
            reason={watch("reason")}
            control={control} 
            handleChange={HandleData}
          />
        );

      default:
        return "unknown step";
    }
  };
  return (
    <>
      <PrimarySearchAppBar />
      <Gear />
      <CssBaseline />
      <Container component={Box} p={1}>
        <Paper component={Box} p={2}>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <Step>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === 3 ? (
            <Box mt={3} mb={3}>
            <Typography variant="h3" align="center">
              {success? 'ยื่นคำร้องสำเร็จ' : 'ช่วยรอสักครู่'}
            </Typography>
            </Box>
            
          ) : (
            <>
            <form>
              {getStepContent(activeStep)}
              <Box
                pt={5}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={HandleBack}
                >
                  ย้อนกลับ
                </Button>
                {activeStep === 2? 
                  <Button
                  variant="contained"
                  color="primary"
                  disabled={CheckError(activeStep)}
                  onClick={(e) => HandleNext(e)}
                >
                  ยื่นคำร้อง
                </Button>
                :
                <Button
                  variant="contained"
                  color="primary"
                  disabled={CheckError(activeStep)}
                  onClick={(e) => HandleNext(e)}
                >
                  ต่อไป
                </Button> }               
              </Box>
              </form>                                   
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default StudentForm;
