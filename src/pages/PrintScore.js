import React from 'react'
import PrimarySearchAppBar from '../components/Appbar'
import PrintIcon from '@mui/icons-material/Print';
import './PrintScore.css'
import jsPDF from 'jspdf'
import { Chip, Paper, Box } from '@mui/material';
const PrintScore = () => {
    const getPDF = () => {
        const doc = new jsPDF("p", "pt", "a4")

        doc.html(document.querySelector("#content"), {
            callback: function(pdf){
                pdf.save("pdf.pdf")
            }
        })
    }
  return (
    <>
        <PrimarySearchAppBar />
        <Paper
        elevation={10}
        sx={{
          mt: 8,
          display: 'flex',
          justifyContent:'flex-end'
        }}>
        <Chip 
            clickable
            sx={{
                height: '50px',
                width: '10%',
                mr: 5
            }}
            icon={<PrintIcon />}
            onClick = {() => {getPDF()}}
        />
            
        </Paper>
        <div id='content'>
           
             <div className='section1'>
                <img src={require('../images/gear-logo.jpg')} width='80px' height='80px' />
                <h1>test</h1>
            </div>
          
        </div>
    </>
  )
}

export default PrintScore