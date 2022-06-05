import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useLocation } from "react-router-dom";
const ScoreTable = ({ petitions }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const date = (dates) => {
    let getDate = new Date(dates)
    return getDate.getDate() + '/' +  getDate.getMonth() + '/' +  (getDate.getFullYear()+543)
  }

  return (
      <>   
    <Typography variant="h4" mb={2}>รายการยื่นคำร้องตรวจสอบระดับคะแนน</Typography>
    <TableContainer sx={{borderRadius:'10px'}} component={Paper}>
    <Table sx={{minWidth: 650}}  aria-label="simple table">
      <TableHead 
      sx={{
          backgroundColor: '#D68E26',
          
      }}>
        <TableRow>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727'}} >นักศึกษา</TableCell>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727'}} align="right">ขื่อวิชา</TableCell>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727'}} align="right">อาจารย์</TableCell>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727'}} align="right">ประเภทคะแนน</TableCell>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727', marginLeft:'5em'}} align="right">วันที่</TableCell>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727'}} align="right">สถานะ</TableCell>
          <TableCell sx={{fontSize:'1.1em', fontWeight:'bold', color:'#101727'}} align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {petitions.map((petition) => (
          <TableRow
            key={petition.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{petition.student_name}</TableCell>
            <TableCell align="right">{petition.subject}</TableCell>
            <TableCell align="right">{petition.professor}</TableCell>
            <TableCell align="right">{petition.score_type}</TableCell>
            <TableCell align="right">{date(petition.date)}</TableCell>
            <TableCell align="right">
                <Chip 
                label={petition.status}
                variant="outlined" 
                sx={{
                    borderColor:
                    ((petition.status === 'รออนุมัติ' && '#FFAB0B')),
                    borderWidth:'3px'
                }}
                />
            </TableCell>
            <TableCell align="right">
              <Chip
              sx={{
                display:'flex',
                margin: '5px auto', 
                justifyContent:'center'
              }}
               icon={<VisibilityIcon  />}  variant="outlined" onClick={() =>{
                 if(location.pathname.split('/')[1] === "student"){
                  navigate(`/student/petition/${petition.id}`)
                 }else{
                  navigate(`/personnel/petition/${petition.id}`)
                 }
               } } clickable/>            
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
};

export default ScoreTable;
