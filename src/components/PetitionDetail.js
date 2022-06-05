import React from "react";
import Container from "@mui/material/Container";
import {
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const PetitionDetail = ({control, data, err, handleChange, rScore, other}) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
        รายละเอียดคำร้อง
      </Typography>
      <Paper
        elevation={6}
        sx={{
          mt: 3,
        }}
      >
        <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
          <Grid xs={2} item>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ marginTop: 2 }}
            >
              รหัสวิชา
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              defaultValue={data.subjectID}
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
              ชื่อวิชา
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              defaultValue={data.subjectName}
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
              ภาคการศึกษาที่
            </Typography>
          </Grid>
          <Grid xs={3} item>
            <FormControl fullWidth>
              <InputLabel id="semester-select-label">ภาคการศึกษาที่</InputLabel>
              <Controller
                render={({field}) => (
              <Select
                {...field}
                labelId="semester-select-label"
                id="semester-select"
                label="Semester"              
                onChange={(e)=>{
                  field.onChange(e.target.value)
                  handleChange(e)
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
                )}
                name="semester"
                control={control}
                />
            </FormControl>
          </Grid>
          <Grid xs={2} item>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ marginTop: 2 }}
            >
              ปีการศึกษาที่
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Controller
              render={({field})=> 
              <TextField
               {...field} 
                fullWidth
                variant="standard"
                error={err.year}
                helperText={err.year && "ช่วยใส่ปีการศึกษาที่ถูกต้อง"}
                onChange={(e)=>{
                  field.onChange(e.target.value)
                  handleChange(e)
                }}
               />}
                name="year"
                control={control}
              />
          </Grid>
          <Grid xs={3} sm={2} item>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ marginTop: 2 }}
            >
              ชื่ออาจารย์
            </Typography>
          </Grid>
          <Grid xs={8} sm={9} item>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              defaultValue={data.pname}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid xs={3} sm={2} item>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ marginTop: 2 }}
            >
              ประเภทคะแนน
            </Typography>
          </Grid>
          <Grid
            xs={7}
            sx={{
              mt: 3,
            }}
          >
          <Controller
            render={({field})=>
            (
              <RadioGroup
              {...field}
              aria-label="rScore"
              onChange={(e)=>{
                field.onChange(e.target.value)
                handleChange(e)
              }}                 
            >
              <FormControlLabel
                value="ข้อสอบกลางภาค"
                control={<Radio />}
                label="ข้อสอบกลางภาค"
              />
              <FormControlLabel
                value="ข้อสอบประจำภาค"
                control={<Radio />}
                label="ข้อสอบประจำภาค"
              />
              <FormControlLabel
                value="อื่นๆ"
                control={<Radio />}
                label="อื่นๆ"
              />
            </RadioGroup>
            )}
            name="rScore"
            control={control}
            />       
              {rScore === "อื่นๆ" ?
              <Controller
                render={({field}) => 
                (
                <TextField 
                  {...field} 
                  fullWidth 
                  variant="standard" 
                  error={other !== ""? false:true }
                  helperText={other !== "" ? "" : "ช่วยบอกเหตุผล"}
                  onChange={(e)=>{
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
                  />
                )}
                  name="other"
                  control={control}
              />
               : 
               <></>
               }
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PetitionDetail;
