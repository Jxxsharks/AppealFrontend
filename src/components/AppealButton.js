import React from 'react'
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const ModifyButton = styled(Button)({
  padding: '6px 12px',
  border: '2px solid',
  lineHeight: 1.5,
  backgroundColor: '#F86811',
  borderColor: '#FB8501',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#C75910',
    borderColor: '#FB8501',
    boxShadow: 'none',
  },
})

function AppealButton({text}) {
  return (
    <ModifyButton>
         <Typography
            sx={{color:'white'}}
          >
            {text}
          </Typography>
    </ModifyButton>
  )
}

export default AppealButton