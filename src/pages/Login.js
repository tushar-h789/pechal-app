import React from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import Images from "../components/Images";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";

import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";

const commonButton = styled(Button)({
  width: "100%",
  boxShadow: "none",
  textTransform: "none",
  fontSize: "20.64px",
  padding: "19px 12px",
  backgroundColor: "#5F35F5",
  marginTop: "56px",
  fontFamily: ["Nunito", "sans-serif"],
  "&:hover": {
    backgroundColor: "#000",
  },
});

const Login = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regrightside">
            <div>
              <Header>
                <Heading
                  title="Login to your account!"
                  className="heading"
                  as="h2"
                />
              </Header>
              <div className="googlelogin">
                <Images imgsrc="assets/googlelogin.png" />
              </div>
              <div className="inputboxcontainer">
                <InputBox
                  className="reginput"
                  label="Email Address"
                  variant="standard"
                />
                <InputBox
                  className="reginput"
                  label="Password"
                  variant="standard"
                />
                <PButton bname={commonButton} title="Login to Continue" />

                <AuthenticationLink
                  className="reglink"
                  title="Don’t have an account ?"
                  href="/"
                  hreftitle="Sign Up"
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Images className="regimg" imgsrc="assets/regimgTwo.png" />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
