import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Appbar";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  getButtonBaseUtilityClass,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/system";
import Gear from "../components/Gear";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";



const PetitionForm = () => {
    const location = useLocation();
  const params = useParams();
  const [appeal, setAppeal] = useState({});
  const [load, setLoad] = useState(true);
    let defaultValues = {
        request1: "",
        request2: "",
        request3: "",
        request4: "",
        request5: "",
      };
  
  const { control, watch } = useForm({ defaultValues });

  useEffect(() => {
    const getAppeal = async () => {
      const res = await axios.get(
        `http://localhost:8000/${
          location.pathname.split(`/`)[1]
        }/petition/petitionid:${params.petition_id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setAppeal(res.data);
      setLoad(false);
    };
    getAppeal();
  }, []);
  const getButton = (appeal) => {
    switch (appeal.status) {
      case "รออนุมัติ":
        if (location.pathname.split("/")[1] === "personnel") {
          return (
            <Box
              pt={5}
              paddingRight={3}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: "3em",
                }}
                disabled={watch("request1") === ""}
              >
                ไม่อนุมัติ
              </Button>
              <Button variant="contained" color="primary" disabled={watch("request1") === ""}>
                อนุมัติ
              </Button>
            </Box>
          );
        }
    }
  };
  return (
    <>
      <PrimarySearchAppBar />
      <Gear />
      <CssBaseline />
      <Container component={Box} p={1}>
        {load ? (
          <>
            <Paper
              sx={{
                display: "flex",
                height: "50vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h2">รอสักครู่</Typography>
              <InfoIcon
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </Paper>
          </>
        ) : (
          <>
            <Paper component={Box} p={2} mb={3}>
              <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                ข้อมูลผู้ยื่นคำร้อง
              </Typography>

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
                    defaultValue={appeal.student_name}
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
                    defaultValue={appeal.field}
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
                    defaultValue={appeal.faculty}
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
                    defaultValue={appeal.advisor}
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
                    defaultValue={appeal.email}
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
                    defaultValue={appeal.phone}
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
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    defaultValue={appeal.gpax}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper component={Box} p={2} mb={3}>
              <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                รายละเอียดคำร้อง
              </Typography>
              <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
                <Grid xs={3} sm={2} item>
                  <Typography
                    variant="body1"
                    textAlign={"center"}
                    sx={{ marginTop: 2 }}
                  >
                    ชื่ออาจารย์ผู้สอน
                  </Typography>
                </Grid>
                <Grid xs={8} sm={9} item>
                  <TextField
                    fullWidth
                    id="name"
                    defaultValue={appeal.professor_name}
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
                    รหัสวิชา
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    defaultValue={appeal.subject_ID}
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
                    defaultValue={appeal.subject_name}
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
                    ภาคการศึกษา
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    defaultValue={appeal.semester}
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
                    ปีการศึกษา
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    defaultValue={appeal.year}
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
                    ประเภทคะแนน
                  </Typography>
                </Grid>
                <Grid xs={10} item>
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    defaultValue={appeal.score_type}
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
                    รายละเอียด
                  </Typography>
                </Grid>
                <Grid xs={10} item>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    id="outlined-read-only-input"
                    defaultValue={appeal.detail}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper component={Box} p={2} mb={3}>
              <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                ความคิดเห็นเจ้าหน้าที่สาขา
              </Typography>
              <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
                <Grid xs={10} item>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={6}
                        fullWidth
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        error={
                            appeal.request_1 === "" ? watch("request1") === "" : false
                        }
                        helperText={appeal.request_1 === "" ? watch("request1") === "" ? "ใส่ความคิดเห็น" : "" : ""}
                        disabled={!appeal.request_1 === ""}
                      />
                    )}
                    control={control}
                    name="request1"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper component={Box} p={2} mb={3}>
              <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                ความคิดเห็นหัวหน้าสาขาวิชา
              </Typography>
              <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
                <Grid xs={10} item>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={6}
                        fullWidth
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        error={
                            appeal.request_1 === "" ? watch("request1") === "" : false
                        }
                        helperText={appeal.request_1 === "" ? watch("request1") === "" ? "ใส่ความคิดเห็น" : "" : ""}
                        disabled={!appeal.request_1 === ""}
                      />
                    )}
                    control={control}
                    name="request2"
                  />
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
        {getButton(appeal)}
      </Container>
    </>
  );
};

export default PetitionForm;
