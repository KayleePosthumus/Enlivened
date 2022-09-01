import React, {useState} from 'react';
import Axios from 'axios';
import { BiLockOpenAlt,BiLockAlt } from "react-icons/bi";
import { MdOutlineMailOutline,MdTitle } from "react-icons/md";
import Navbar from './navbar';
import { Navigate } from 'react-router-dom';


const Signup = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userConfPass, setUserConfPass] = useState("");
    const [userName, setUserName] = useState("");
    const [errorMessage, updateErrorMessage] = useState([]);

    const signUp = (e) =>{

        // const requestOptions = {
        // method: 'POST',
        // body: JSON.stringify({"FirstName":userName, "Email":userEmail,"Password":userPass})
        // };
        // fetch("http://197.245.137.83:8728/user/register",requestOptions).then(
        // response => response.json()
        // ).then(
        // data =>
        // console.log(data)
        // );
        Navigate("\login");
        
    }
    
    return (
        <section className="login-block">
        
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 login-sec">
                        <h2 className="text-center">Sign Up</h2>
                        <form className="login-form" onSubmit={signUp}>

                            { errorMessage.length>0 ? (
                                <p>{errorMessage[0]}</p>
                            ):(
                                <div></div>
                            )}

                            <div class="form-group">
                                <label for="exampleInputEmail1" className="text-uppercase mb-2">Username</label>
                                <input type="text" className="form-control mb-3" placeholder="" onChange = {(e) => {
                                                        setUserName(e.target.value)
                                                    }} required/>
                                
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1" className="text-uppercase mb-2">Email</label>
                                <input type="text" className="form-control mb-3" placeholder="" onChange = {(e) => {

                                    var email = e.target.value;

                                    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){

                                        if(!errorMessage.includes("Invalid Email Address")){
                                        updateErrorMessage([...errorMessage, "Invalid Email Address"]);
                                        }

                                    }else
                                    {
                                        setUserEmail(email)
                                        updateErrorMessage(errorMessage.filter(item => item !== "Invalid Email Address"));
                                    }

                                }} required/>
                                
                            </div>

                            <div className="form-group">
                                <label for="exampleInputPassword1" className="text-uppercase mb-2">Password</label>
                                <input type="password" className="form-control mb-3" placeholder="" onChange = {(e) => {
                                    var uPass = e.target.value;

                                    if(!errorMessage.includes("Passwords do not match") && uPass !== userConfPass){

                                        if(!errorMessage.includes("Passwords do not match")){
                                        updateErrorMessage([...errorMessage, "Passwords do not match"]);
                                        }

                                    }else{
                                        updateErrorMessage(errorMessage.filter(item => item !== "Passwords do not match"));
                                        setUserPass(uPass);
                                    }

                                }} required/>

                            </div>

                            <div className="form-group">
                                <label for="exampleInputPassword1" className="text-uppercase mb-2">Confirm Password</label>
                                <input type="password" className="form-control " placeholder="" onChange = {(e) => {
                                    var cPass = e.target.value;

                                    if(!errorMessage.includes("Passwords do not match") && userPass !== cPass){

                                        if(!errorMessage.includes("Passwords do not match")){
                                        updateErrorMessage([...errorMessage, "Passwords do not match"]);
                                        }

                                    }else{
                                        updateErrorMessage(errorMessage.filter(item => item !== "Passwords do not match"));
                                        setUserConfPass(cPass);
                                    }

                                }} required/>
                            </div>
            
                            <br/>
                            <button type="submit" className="btn-login float-right"  disabled={errorMessage.length > 0 || userPass === "" || userEmail === "" || userName === ""}>Sign Up</button>
                            <br></br>
                            <a href="\login">Log In?</a>
             
                        </form> 
                    </div>

                    <div className="col-md-8 banner-sec">
                        <img className="d-block img-fluid" src="https://www.motosha.com/files/preview/1280x853/6173-yellow-dandelion-flower-dark-edit.jpg" height="100%" alt=""/>
                
                        <h2 className="centered">Welcome to Enlivened!</h2>
                        <p className="paragraph">A place where you can find your social community, encourage one another, build confidence, create and attend activities of your choice.</p>     
                    </div>
                </div>
            </div> 
        </section>

    );
}

export default Signup;
