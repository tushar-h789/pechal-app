import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import Images from "../components/Images";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dna } from "react-loader-spinner";

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
  let auth = getAuth();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [loader, setLoader] = useState(false);

  let [error, setError] = useState({
    email: "",
    password: "",
  });

  let handleForm = (e) => {
    let { name, value } = e.target;

    if (name === "password") {
      let capi = /[A-Z]/;
      let lower = /[a-z]/;
      let num = /[0-9]/;
      if (!capi.test(value)) {
        setError({ ...error, password: "One Capital Letter Rewuired" });
        return;
      }
      if (!lower.test(value)) {
        setError({ ...error, password: "One Small Letter Rewuired" });
        return;
      }
      if (!num.test(value)) {
        setError({ ...error, password: "One Number Rewuired" });
        return;
      }
      if (value.length < 6) {
        setError({ ...error, password: "Password length atlest 6" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  let handelClick = () => {
    setLoader(true);
    let expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formData.email === "") {
      setError({ ...error, email: "Email Required" });
    } else if (!expression.test(formData.email)) {
      setError({ ...error, email: "Valid Email Required" });
    } else if (formData.fullname === "") {
      setError({ ...error, fullname: "Fullname Required" });
    } else if (formData.password === "") {
      setError({ ...error, password: "Password Required" });
    }else{
      signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      console.log(userCredential.user.emailVerified)
      if(userCredential.user.emailVerified){
        navigate("/home")
      }else{
        toast("Please Verify your email first and try again");
      }
      setLoader(false);
      toast("Login Successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    }
    // else {
    //   setLoader(false);
    //   toast("Login Successful");
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 2000);
    // }
  };

  let [show, setShow] = useState(false);

  let handleGoogle = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log("google done")
  });

  }

  return (
    <>
      <Grid container spacing={2}>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
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
              <div onClick={handleGoogle} className="googlelogin">
                <Images  imgsrc="assets/googlelogin.png" />
              </div>
              <div className="inputboxcontainer">
                <InputBox
                  className="reginput"
                  label="Email Address"
                  variant="standard"
                  textChange={handleForm}
                  type="email"
                  name="email"
                />

                {error.email && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.email}
                  </Alert>
                )}
                <div style={{ width: "100%", position: "relative" }}>
                  <InputBox
                    className="reginput"
                    label="Password"
                    variant="standard"
                    textChange={handleForm}
                    type={show ? "text" : "password"}
                    name="password"
                  />
                  {show ? (
                    <AiFillEye
                      onClick={() => setShow(false)}
                      className="eyeicon"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setShow(true)}
                      className="eyeicon"
                    />
                  )}
                </div>
              </div>

              {error.password && (
                <Alert className="error" variant="filled" severity="error">
                  {error.password}
                </Alert>
              )}

              {loader ? (
                <Dna
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              ) : (
                <PButton
                  click={handelClick}
                  bname={commonButton}
                  title="Login to Continue"
                />
              )}

              <AuthenticationLink
                className="reglink"
                title="Don’t have an account ?"
                href="/"
                hreftitle="Sign Up"
              />
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
