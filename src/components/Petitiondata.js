import React from 'react'
import Container from "@mui/material/Container";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { Controller } from "react-hook-form" 

function Petitiondata({control, handleChange, err}) {

  const user = useSelector((state) => state.userInfo)


  return (
    <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
          ข้อมูลผู้ยื่นคำร้อง
        </Typography>
        <Paper
          elevation={6}
          sx={{
            mt: 3,
          }}
        >
          <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
            <Grid xs={3} sm={2} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                ชื่อ-นามสกุล
              </Typography>
            </Grid>
            <Grid xs={8} sm={9} item>
              <TextField
                fullWidth
                id="name"
                defaultValue={`${user.value.fname} ${user.value.lname}`}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={2} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                สังกัดสาขาวิชา
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <TextField
                fullWidth
                id="outlined-read-only-input"
                defaultValue={user.value.field}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={1} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                สำนักวิชา
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <TextField
                fullWidth
                id="outlined-read-only-input"
                defaultValue={user.value.faculty}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={2} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                อาจารย์ที่ปรึกษา
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <TextField
                fullWidth
                id="outlined-read-only-input"
                defaultValue={user.value.personnelName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={1} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                อีเมล
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <TextField
                fullWidth
                id="outlined-read-only-input"
                defaultValue={user.value.email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={2} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                เบอร์โทร
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <TextField
                fullWidth
                id="outlined-read-only-input"
                defaultValue={user.value.phone}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={1} item>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ marginTop: 2 }}
              >
                GPAX
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Controller
                render={({field}) => <TextField {...field} fullWidth variant="standard" error={err} helperText = {err && "ใส่เกรดของคุณ"} onChange={(e)=>{
                  field.onChange(e.target.value)
                  handleChange(e)
                }}  />}               
                name="gpax"
                control={control}   
                />             
            </Grid>
          </Grid>
        </Paper>
      </Container>
  )
}

export default Petitiondata