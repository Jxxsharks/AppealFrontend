import React, { useEffect, useRef } from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import AppealButton from "./AppealButton";
import VanillaTilt from "vanilla-tilt";
import { Link } from "react-router-dom";

export default function PersonnelCards(props) {
  const tilt = useRef(null);
  const options = {
    scale: 1.1,
    speed: 300,
    transition: true,
  };
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return (
    <>
      <Card
        sx={{
          width: 300,
          pb: 2,
          background: "#FEF2E8",
        }}
        ref={tilt}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "fit",
            height: 200,
          }}
          image={
            props.data.image !== ""
              ? `${props.data.image}`
              : require("../images/profile.png")
          }
          alt="personnel picture"
        />
        <CardContent sx={{ mb: 1 }}>
          <Typography gutterBottom variant="h6" component="div" align="center">
            {`${props.data.first_name} ${props.data.last_name}`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
          style={{textDecoration:'none'}}
           to={`${props.data.personnel_id}`}>
            <AppealButton text="ยื่นคำร้อง" />
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
