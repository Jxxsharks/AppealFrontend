import React from "react";
import Styled from "styled-components";
import waves from "../images/wave-desktop.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container>
        <HomeWrap>
          <TextWrap>
            <Title>
              คุณต้องการที่จะมีส่วนร่วมในการ{" "}
              <span style={{ color: "white" }}>ยื่นคำร้อง</span> ที่แสนสุดยอด ?
            </Title>
            <Button to="/login">เข้าใช้งาน</Button>
          </TextWrap>
          <Think src={require("../images/message-think.svg").default} />
        </HomeWrap>
        <Img src={waves} />
      </Container>
    </>
  );
}

const Container = Styled.div`
   height: 100vh;
   display: flex;
   flex-direction: column;
   align-items:center;
   justify-content: space-between;
   background: linear-gradient(95deg,#F45702,#F9A779,#FEF2E8);
   background-size: 180% 180%;
   
   animation: gradient-animation 9s ease infinite;

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

export const Img = Styled.img`
    width: 100%;
    height: 20%;
    animation: move 9s ease infinite;
    @keyframes move {
        0%{
            height:20%;
        }
        50%{
            height:30%;
        }
        100%{
            height: 20%;
        }
    }
`;
const HomeWrap = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;

    @media screen and (max-width: 1100px){
        width: 80%;
    }
    @media screen and (max-width: 900px){
        flex-direction: column;
        justify-content: space-around;
    }

`;
const TextWrap = Styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 900px){
        align-items: center;
        justify-content: space-between;
        padding: 50px;
    }

`;

const Title = Styled.h1`
    color: #101727;
    max-width: 500px;
    font-size: 3rem;
    @media screen and (max-width: 1100px){
        font-size: 2rem;
    }
    @media screen and (max-width: 900px){
        max-width: 300px;
        font-size: 2rem;
    }
    
`;

const Think = Styled.img`
    position:relative;
    right: 0px;
    @media screen and (max-width: 900px){
        max-width: 60%;
        
    }

`;

const Button = Styled(Link)`
    font-family: 'Noto Sans Thai', sans-serif; !important;
    width: 40%;
    text-decoration: none;
    font-size: 1.3rem;
    margin: 10px;
    padding: 5px 2px;;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: #101727;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
    border: none;

    &:hover {
        background-position: right center;
    }
    
`;
export default Home;
