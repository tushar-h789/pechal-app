import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import Images from "../components/Images";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import Alert from "@mui/material/Alert";
import {AiFillEye} from "react-icons/ai"

const commonButton = styled(Button)({
  width: "100%",
  boxShadow: "none",
  textTransform: "none",
  fontSize: "20.64px",
  padding: "19px 12px",
  backgroundColor: "#5F35F5",
  borderRadius: "86px",
  marginTop: "56px",
  fontFamily: ["Nunito", "sans-serif"],
  "&:hover": {
    backgroundColor: "#000",
  },
});

const Regristration = () => {
  let [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  let [error, setError] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  let handelForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  let handelClick = () => {
    if (formData.email == "") {
      setError({ ...error, email: "Email Rewuired" });
    } else if (formData.fullname == "") {
      setError({ ...error, fullname: "Fullname Required" });
    } else if (formData.password == "") {
      setError({ ...error, password: "Password Required" });
    }
  };

  return (
    <>
      {/* this is email validation */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regleftside">
            <div>
              <Header>
                <Heading
                  title="Get started with easily register"
                  className="heading"
                  as="h2"
                />
              </Header>
              <p className="regsubheading">
                Free register and you can enjoy it
              </p>
              <div className="inputboxcontainer">
                <InputBox
                  className="reginput"
                  label="Email Address"
                  variant="outlined"
                  textChange={handelForm}
                  type="email"
                  name="email"
                />

                {error.email && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.email}
                  </Alert>
                )}

                <InputBox
                  className="reginput"
                  label="Ful name"
                  variant="outlined"
                  textChange={handelForm}
                  type="text"
                  name="fullname"
                />

                {error.fullname && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.fullname}
                  </Alert>
                )}

                <InputBox
                  className="reginput"
                  label="Password"
                  variant="outlined"
                  textChange={handelForm}
                  type="password"
                  name="password"
                />

                <AiFillEye className="reginput"/>

                {error.password && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.password}
                  </Alert>
                )}

                <PButton
                  click={handelClick}
                  bname={commonButton}
                  title="Sign up"
                />

                <AuthenticationLink
                  className="reglink"
                  title="Already  have an account ?"
                  href="/login"
                  hreftitle="Sign In"
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Images className="regimg" imgsrc="assets/