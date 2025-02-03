import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../src/loginstyle.css";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseconfig";

export default function Login() {
 const[email,setemail]=useState('')
  const navigate = useNavigate();
  const[errors,seterrors]=useState({})
const[password,setpassword]=useState('')
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleemail=(e)=>{
    setemail(e.target.value)
  }

  const handlepassword=(e)=>{
    setpassword(e.target.value)
  }

  const loginuser= async(e)=>{
 e.preventDefault()
 try{
  await signInWithEmailAndPassword(auth,email,password)
  alert("login successfull")
  navigate("/welcome")
  setemail('')
  setpassword('')
 }catch(error){
  seterrors("error: "+ error.message)
  alert("error:"+error.message)
 }
  }
const forgetpassword=async()=>{
try{
  await sendPasswordResetEmail(auth,email)
  alert("password reset link sent successfully")

} catch(error)
{
  seterrors("error:"+error.message)
}


}
  return (
    <div className="header2">
      <div>
        <img src="/homepage.jpeg" className="img2" alt="Landing Page" />
      </div>
      <div className="logincontainer2">
        <h1 className="signuptext2">Sign in to Turtlehood</h1>
      <form onSubmit={loginuser}>
      <p className="usernametext2">Email</p>
        <input className="usernameinput2" type="email" value={email} onChange={handleemail} />
        <p className="emailtext2">Password</p>
        <input className="usernameinput2" type="password" value={password} onChange={handlepassword} />
        <a href="#" className="forget2" onClick={forgetpassword}>
          Forgot password?
        </a>
        <input className="loginbutton2" type="submit" value="Login" />
      </form>

        <p className="divider2">---------------------or---------------------</p>
        <p className="donttext2">Don't have an account?</p>

        <input
          className="signupbutton2"
          type="button"
          value="Sign Up"
          onClick={handleSignup}
        />
      </div>
    </div>
  );
}
