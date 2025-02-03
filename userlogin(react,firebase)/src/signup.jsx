import React, { useState } from "react";
import "../src/signupstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { push, ref, set } from "firebase/database";
import { database,auth } from "./firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";


export default function Signup() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPass] = useState("");
    const [error, setErrors] = useState({});
    const navigate = useNavigate()
    const handleUsername = (e) => setUser(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPass = (e) => setConfirmPass(e.target.value);

const validate = ()=>{
    let isvalid = true;
    let erroValue = {};
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if(!passwordPattern.test(password)){
        isvalid=false;
        erroValue.password="password must be 8 characters long \n password must contain\n 1 numeric value, 1 special character and 1 capital letter"
    }
    if(password!==confirmpass){
        isvalid=false;
        erroValue.confirmpass="password dont match"
    }
    setErrors(erroValue);
    return(isvalid);
}
const savedata = (event)=>{
    event.preventDefault();
    if(validate()){
        alert("successfully registered")
        setUser("")
        setEmail("")
        setConfirmPass("")
        setPassword("")
        firebase()
        
    }
    
}
const firebase = async () => {
    try {
        const usercredentials = await createUserWithEmailAndPassword(auth,email,password);
        const userID=usercredentials.user.uid;
        const userRef = collection(database, "users"); 
        await addDoc(userRef, {username: user,email: email,password: password,userid:userID });
        console.log("Data saved successfully!");
        navigate("/welcome")
    } catch (error) {
        console.error("Error saving data: ", error);
        setErrors({firebase:error.message})
    }
};

    return (
        <div className="header">
            <div>
                <img src="/homepage.jpeg" className="img" alt="landing page" />
            </div>
            <div className="logincontainer">
                <p className="donttext">
                    Already have an account? <Link to={"/login"}>Click here</Link>
                </p>
                <h1 className="signuptext">Sign up to Turtlehood</h1>
                <form onSubmit={savedata}>
                    <p className="usernametext">Username</p>
                    <input className="usernameinput" type="text" value={user} onChange={handleUsername} />
                    <p className="emailtext">Email</p>
                    <input className="usernameinput" type="email" value={email} onChange={handleEmail} />
                    <p className="emailtext">Password</p>
                    <input className="usernameinput" type="password" value={password} onChange={handlePassword} />
                    {error.password&&<p className="errorvalue">{error.password}</p>}

                    <p className="emailtext">Confirm Password</p>
                    <input className="usernameinput" type="password" value={confirmpass} onChange={handleConfirmPass} />
                    {error.confirmpass&&<p className="errorvalue">{error.confirmpass}</p>}

                    <input className="loginbutton" type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    );
}
