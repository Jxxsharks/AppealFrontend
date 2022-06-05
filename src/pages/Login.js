import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errMsg, SetErr] = React.useState("")
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    
    await axios
      .post(
        "http://localhost:8000/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        SetErr("")
        dispatch(
          login({
            id: res.data.data.id,
            fname: res.data.data.first_name,
            lname: res.data.data.last_name,
            field: res.data.data.field,
            faculty: res.data.data.faculty,
            email: res.data.data.email,
            phone: res.data.data.phone,
            image: res.data.data.image,
            personnelName:res.data.data.personnel_name,
            positionid: res.data.data.position_id,
            personnelid: res.data.data.personnel_id,
            isStudent: res.data.role,
          })
        );
        if (res.data.role) {
          navigate("/student/score");
        } else if (!res.data.role) {
          navigate("/personnel");
        }
      })
      .catch((err) => {
        SetErr("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง")
      });
     
  };

  return (
    <>
      <Container>
        <Form onSubmit={submit}>
          <FormH1>เข้าสู่ระบบ</FormH1>
          {errMsg && <FormErr>{errMsg}</FormErr>}
          <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
          <FormInput
            type="text"
            required
            placeholder="ชื่อผู้ใช้งาน"
            onChange={(e) => { setUsername(e.target.value);SetErr("") }}
          />
          <FormLabel>รหัสผ่าน</FormLabel>
          <FormInput
            type="password"
            placeholder="รหัสผ่าน"
            required
            onChange={(e) => { setPassword(e.target.value);SetErr("") }}
          />
          <FormButton type="submit">เข้าสู่ระบบ</FormButton>
        </Form>
      </Container>
    </>
  );
}

const Container = Styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(95deg,#F45702,#F9A779,#FEF2E8);
   background-size: 180% 180%;
   
   animation: gradient-animation 6s ease infinite;

   @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 20% 50%;
    }
    75% {
        background-position: 50% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
   }
`;

const Form = Styled.form`
   width: 25rem;
   height: 28rem;
   display:flex;
   flex-direction: column;
   background:rgba(255, 255, 255, 0.06);
   box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
   border-radius: 30px;
   border-left: 1px solid rgba(255, 255, 255, 0.3);
   border-top: 1px solid rgba(255, 255, 255, 0.3);

   &:before {
       content: "";
       position: absolute;
       bottom: 2%;
       right: 35%;
       width: 180px;
       height: 180px;
       background: #fedd74;
       border-radius: 50%;
       z-index: 1;
       opacity: 0.5;
       animation: godown 15s linear infinite;
       @keyframes godown {
           0%{
            bottom: 2%;
           }
           50%{
            bottom: 5%;        
           }
           100%{
            bottom: 2%;
           }
       }

   }

   &:after {
    content: "";
    position: absolute;
    top: 2%;
    left: 35%;
    width: 120px;
    height: 120px;
    background: #fedd74;
    border-radius: 50%;
    z-index: 1;
    opacity: 0.8;
    animation: goup 15s linear infinite;
       @keyframes goup {
           0%{
            top: 2%;
           }
           50%{
            top: 5%;        
           }
           100%{
            top: 2%;
           }
       }

}
`;
const FormH1 = Styled.h1`
   font-size: 50px;
   text-align: center;
   color: #101727;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
   letter-spacing: 2px;
   margin-bottom: 5%;
   opacity: 0.9;
`;

const FormLabel = Styled.label`
   font-size: 20px;
   color: #101727;
   margin-left: 10%;
   opacity: 0.8;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
`;

const FormInput = Styled.input`
   width: 80%;
   margin: 5% auto;
   margin-bottom: 8%;
   border: none;
   outline: none;
   background: transparent;
   color: white;
   border-bottom: 1px solid rgba(255, 255, 255, 0.6);
   opacity: 0.8;
  
`;

const FormButton = Styled.button`
   width: 50%;
   margin: 3% auto;
   color: #101727;
   font-size: 15px;
   opacity: 0.7;
   background: rgba(255, 255, 255, 0.6);
   padding 10px 30px;
   border: none;
   outline: none;
   border-radius: 20px;
   text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.4);
   box-shadow: 3px 5px 5px rgba(31, 38, 135, 0.37);
   border-left: 1px solid  rgba(255, 255, 255, 0.4);
   border-top: 1px solid  rgba(255, 255, 255, 0.4);
   cursor: pointer;
   transition: all 0.3s ease-in-out;
   &:hover {
       background: #101727;
       color: white;
       transition: all 0.3s ease-in-out;
   }
`;

const FormErr = Styled.p`
   margin-left: 5%;
   margin-bottom: 2%;
   padding: 0px 3%;
   background: rgba(255, 255, 255, 0.5);
   width: 55%;
   border-radius: 10px;
   font-size: 0.8rem;
   color: #C83F34;
`

export default Login;
