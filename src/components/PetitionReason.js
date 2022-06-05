import { Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const PetitionReason = ({control, reason, handleChange}) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
        เหตุผล/รายละเอียด
      </Typography>
      <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
        <Grid item xs={12}>
        <Controller
          render={({field}) => 
            <TextField 
            {...field}
            multiline
            rows={6} 
            fullWidth
            error={reason !== ""? false : true }
            helperText={reason === "" ? "ช่วยบอกเหตุผล" : ""}
            onChange={(e) =>{
              field.onChange(e.target.value)
              handleChange(e)
            }}  
            />
          }
          name="reason"
          control={control}
        />
         
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetitionReason;
