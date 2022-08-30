import React, {useState} from 'react';
import Axios from 'axios';
import { BiLockOpenAlt,BiLockAlt } from "react-icons/bi";
import { MdOutlineMailOutline,MdTitle } from "react-icons/md";
import Navbar from './navbar';


const Signup = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userConfPass, setUserConfPass] = useState("");
    const [userName, setUserName] = useState("");
    const [errorMessage, updateErrorMessage] = useState([]);

    const signUp = (e) =>{
    }
    
    return (
        <section class="login-block">
        
        <br/>
            <div class="container">
            <div class="row">
                <div class="col-md-4 login-sec">
                    <h2 class="text-center">Sign Up</h2>
                    <form class="login-form" onSubmit={signUp}>
            <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                <input type="text" class="form-control" placeholder="" onChange = {(e) => {
                                        setUserName(e.target.value)
                                    }} required/>
                
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">Email</label>
                <input type="text" class="form-control" placeholder="" onChange = {(e) => {

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
            <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                <input type="password" class="form-control" placeholder="" onChange = {(e) => {
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

            <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">Confirm Password</label>
                <input type="password" class="form-control" placeholder="" onChange = {(e) => {
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
            <button type="submit" class="btn-login float-right"  disabled={errorMessage !== "" || userPass === "" || userEmail === "" || userName === ""}>Sign Up</button>
            <br/>
            <p>OR</p>
            <button type="button" class="btn-login float-right" onclick="window.location.href='./login.jsx'">Login</button>
            
        
        
        </form> 

       </div>
        <div class="col-md-8 banner-sec">
        <img class="d-block img-fluid" src="https://www.motosha.com/files/preview/1280x853/6173-yellow-dandelion-flower-dark-edit.jpg" width="8000" height="9000" alt="First slide"/>
  
        <h2 class="centered">Welcome to Enlivened!</h2>
        <p class="paragraph">A place where you can find your social community, encourage one another, build confidence, create and attend activities of your choice.</p>

      
    

            
        </div>
</div>
</div> 

</section>

    );
}

export default Signup;
