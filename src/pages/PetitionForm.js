import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Appbar";
import {  useLocation, useParams } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Link
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/system";
import Gear from "../components/Gear";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PetitionForm = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const params = useParams();
  const state = useSelector((state) => state.userInfo.value);
  const [appeal, setAppeal] = useState({});
  const [load, setLoad] = useState(true);
  let defaultValues = {
    request1: "",
    request2: "",
    request3: "",
    request4: "",
    request5: "",
    files: [],
  };

  const { register, control, watch, setValue } = useForm({ defaultValues });

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
      if(res.status === 401){
        navigate('/')
      }
      
      setAppeal(res.data);
      setLoad(false);
    };
    getAppeal();
    console.log(appeal);
    setValue("request1", appeal.request_1);
    setValue("request2", appeal.request_2);
    setValue("request3", appeal.request_3);
    setValue("request4", appeal.request_4);
    setValue("request5", appeal.request_5);
  }, [load]);

  const HandleSubmit = async (isSuccess) => {
    let base64;
    let type;
    if (watch("files").length !== 0) {
      base64 = await convertBase64(watch("files")[0]);
      type = watch("files")[0].type;
    }

    await axios
      .put(
        `http://localhost:8000/${
          location.pathname.split("/")[1]
        }/petition/score`,
        {
          id: appeal.id,
          request_1: watch("request1"),
          request_2: watch("request2"),
          request_3: watch("request3"),
          request_4: watch("request4"),
          request_5: watch("request5"),
          status: appeal.status,
          base64: base64,
          type: type,
          is_success: isSuccess,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        navigate(`/${location.pathname.split('/')[1]}/petitionscore`)
      })
      .catch((err) => {
        navigate('/')
      });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result.split(",").pop());
      };

      fileReader.onerror = () => {
        reject(fileReader.error);
      };
    });
  };

  const ProcessButton = ({ text1, text2, disabled }) => {
    return (
      <Box
        pt={5}
        paddingRight={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {appeal.status === "รออนุมัติ" ||
        appeal.status === "แจ้งผลพิจารณาครั้งที่1" || appeal.status === "แจ้งผลพิจารณาครั้งที่2" ? (
          <Button
            variant="contained"
            color="primary"
            sx={{
              mr: "3em",
            }}
            disabled={
              appeal.status === "แจ้งผลพิจารณาครั้งที่1"
                ? false
                : watch(`request${1}`) === ""
            }
            onClick={() => HandleSubmit(false)}
          >
            {text2}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{
              visibility: "hidden",
              mr: "3em",
            }}
            disabled={
              appeal.status === "แจ้งผลพิจารณาครั้งที่1"
                ? false
                : watch(`request${1}`) === ""
            }
          >
            {text2}
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={() => HandleSubmit(true)}
        >
          {text1}
        </Button>
      </Box>
    );
  };

  const getButton = (appeal) => {
    switch (appeal.status) {
      case "รออนุมัติ":
        if (location.pathname.split("/")[1] === "personnel") {
          return <ProcessButton text1="อนุมัติ" text2="ไม่อนุมัติ" />;
        }
        break;
      case "แจ้งผลพิจารณาครั้งที่1":
        if (location.pathname.split("/")[1] === "student") {
          return <ProcessButton text1="ยอมรับ" text2="ไม่ยอมรับ" />;
        }
        break;
      case "แจ้งผลพิจารณาครั้งที่2":
        if (location.pathname.split("/")[1] === "student") {
          return <ProcessButton text1="ยอมรับ" />;
        }
        break;
      default:
        if (location.pathname.split("/")[1] === "personnel") {
          let num = false;
          switch (appeal.status) {
            case "แจ้งหัวหน้าสาขา":
              num = watch("request2") === "";
              return <ProcessButton text1="ดำเนินการต่อ" disabled={num} />;
              break;
            case "แจ้งอาจารย์ประจำวิชา":
              num = watch("request3") === "";
              num = watch("files").length === 0;
              return <ProcessButton text1="ดำเนินการต่อ" disabled={num} />;
              break;
            case "พิจารณาใหม่ครั้งที่2":
              num = watch("request4") === "";
              return <ProcessButton text1="ดำเนินการต่อ" disabled={num} />;
              break
            case "ระหว่างพิจารณา":
              num = watch("request5") === "";
              return <ProcessButton text1="ดำเนินการต่อ" disabled={num} />;
              break;
            case "สำเร็จ":
              break
              case "ไม่อนุมัติ":
                break
            default:
              return <ProcessButton text1="ดำเนินการต่อ" disabled={false} />;
          }
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
                          state.isStudent
                            ? false
                            : appeal.status === "รออนุมัติ"
                            ? appeal.request_1 === ""
                              ? watch("request1") === ""
                              : false
                            : false
                        }
                        helperText={
                          state.isStudent
                            ? ""
                            : appeal.status === "รออนุมัติ"
                            ? appeal.request_1 === ""
                              ? watch("request1") === ""
                                ? "ใส่ความคิดเห็น"
                                : ""
                              : ""
                            : ""
                        }
                        
                        InputProps={{
                          readOnly: state.isStudent
                            ? true
                            : appeal.status !== "รออนุมัติ"
                            ? true
                            : !appeal.request_1 === "",
                        }}
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
                          state.isStudent
                            ? false
                            : appeal.status === "แจ้งหัวหน้าสาขา"
                            ? appeal.request_2 === ""
                              ? watch("request2") === ""
                              : false
                            : false
                        }
                        helperText={
                          state.isStudent
                            ? ""
                            : appeal.status === "แจ้งหัวหน้าสาขา"
                            ? appeal.request_2 === ""
                              ? watch("request2") === ""
                                ? "ใส่ความคิดเห็น"
                                : ""
                              : ""
                            : ""
                        }
                        InputProps={{
                          readOnly:  state.isStudent
                            ? true
                            : appeal.status !== "แจ้งหัวหน้าสาขา"
                            ? true
                            : !appeal.request_2 === ""
                        }}
                     
                      />
                    )}
                    control={control}
                    name="request2"
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper component={Box} p={2} mb={3}>
            <Box
              sx={{
                display: 'flex'
              }}
            >
            <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                อาจารย์ประจำวิชาชี้แจงรายละเอียด
              </Typography>
              {appeal.file_1 === "" ? <></> : (
                <Link href={appeal.file_1} 
                sx={{
                  display:'flex',
                  alignItems:'center'

                }}
                >
                  <Typography>เปิดไฟล์</Typography>
                  <OpenInNewIcon />
                </Link>
              )}
            </Box>
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
                          state.isStudent
                            ? false
                            : appeal.status === "แจ้งอาจารย์ประจำวิชา"
                            ? appeal.request_3 === ""
                              ? watch("request3") === ""
                              : false
                            : false
                        }
                        helperText={
                          state.isStudent
                            ? ""
                            : appeal.status === "แจ้งอาจารย์ประจำวิชา"
                            ? appeal.request_3 === ""
                              ? watch("request3") === ""
                                ? "ชื้แจงรายละเอียด"
                                : ""
                              : ""
                            : ""
                        }
                        InputProps={{
                          readOnly:   state.isStudent
                            ? true
                            : appeal.status !== "แจ้งอาจารย์ประจำวิชา"
                            ? true
                            : !appeal.request_3 === ""
                        }}
                      />
                    )}
                    control={control}
                    name="request3"
                  />
                </Grid>
              </Grid>
            </Paper>
            {state.isStudent ? (
              <></>
            ) : appeal.status === "แจ้งอาจารย์ประจำวิชา" ? (
              <>
                <Paper component={Box} p={2} mb={3}>
                  <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                    แนบไฟล์
                  </Typography>
                  <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
                    <Grid xs={2} item>
                      <FileCard>
                        <FileInput>
                          <Input type={"file"} {...register("files")} />
                          <Buttons>
                            <I>
                              <AddIcon />
                            </I>
                            Upload
                          </Buttons>
                        </FileInput>
                      </FileCard>
                    </Grid>
                    <Grid xs={8} item>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        value={
                          !watch("files") || watch("files").length === 0
                            ? ""
                            : watch("files")[0].name
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                        error={
                          state.isStudent
                            ? false
                            : appeal.status === "แจ้งอาจารย์ประจำวิชา"
                            ? appeal.request_3 === ""
                              ? watch("files").length === 0
                              : false
                            : false
                        }
                        helperText={
                          state.isStudent
                            ? ""
                            : appeal.status === "แจ้งอาจารย์ประจำวิชา"
                            ? appeal.request_3 === ""
                              ? watch("files").length === 0
                                ? "โปรดupload file"
                                : ""
                              : ""
                            : ""
                        }
                        
                        disabled={
                          state.isStudent
                            ? true
                            : appeal.status !== "แจ้งอาจารย์ประจำวิชา"
                            ? true
                            : !appeal.request_3 === ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </>
            ) : (
              <></>
            )}

            <Paper component={Box} p={2} mb={3}>
              <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                {`เรียน คณะกรรมการรับข้ออุทธรณ์ (คณบดีสำนักวิชาวิศวกรรมศาสตร์)`}
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
                          appeal.status === "พิจารณาใหม่ครั้งที่2"
                            ? appeal.request_4 === ""
                              ? watch("request3") === ""
                              : false
                            : false
                        }
                        helperText={
                          appeal.status === "พิจารณาใหม่ครั้งที่2"
                            ? appeal.request_4 === ""
                              ? watch("request3") === ""
                                ? "ชื้แจงรายละเอียด"
                                : ""
                              : ""
                            : ""
                        }
                        InputProps={{
                          readOnly:   appeal.status !== "พิจารณาใหม่ครั้งที่2"
                            ? true
                            : !appeal.request_4 === ""
                        }}
                      />
                    )}
                    control={control}
                    name="request4"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper component={Box} p={2} mb={3}>
              <Typography variant="h5" sx={{ mb: 3, ml: 1, mt: 2 }}>
                {`เรียน หัวหน้าสาขาวิชาวิศวกรรมศาสตร์ (คณะกรรมการรับข้ออุทธรณ์ สำนักวิชาวิศวกรรมศาสตร์)`}
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
                          appeal.status === "ระหว่างพิจารณา"
                            ? appeal.request_5 === ""
                              ? watch("request3") === ""
                              : false
                            : false
                        }
                        helperText={
                          appeal.status === "ระหว่างพิจารณา"
                            ? appeal.request_5 === ""
                              ? watch("request3") === ""
                                ? "ชื้แจงรายละเอียด"
                                : ""
                              : ""
                            : ""
                        }
                        InputProps={{
                          readOnly:   appeal.status !== "ระหว่างพิจารณา"
                            ? true
                            : !appeal.request_5 === ""
                        }}
                      />
                    )}
                    control={control}
                    name="request5"
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

const FileCard = styled.div`
  paddding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center,
  align-items: center;
  border: 3px dashed #cbd5e0;
  background-color: #edf2f7;
  min-width: 190px;
  height: 55px;

`;
const FileInput = styled.div`
  position: relative;
  margin-bottom: 1.5em;
`;
const Input = styled.input`
  position: relative;
  text-align: center;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  height: 46px;
  max-width: 100%;
`;

const Buttons = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  background-color: #f55e30;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  outline: none;
  transition: background-color 0.4s;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5);
  &:hover {
    background-color: #f15120;
  }
`;

const I = styled.i`
  width: 1.5em;
  height: 1.5em;
  padding: 0.4em;
  background-color: #fff;
  color: #f55e30;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8em;
  font-size: 0.8em;
`;

export default PetitionForm;
