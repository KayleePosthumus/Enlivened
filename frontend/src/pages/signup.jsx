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
        <div class="bg-light">
            <Navbar/>
            <div class="row justify-content-center mt-4">

                <div class="w-auto card">
                    
                    <div class="card-header h1">
                        SIGN UP
                    </div>

                    <div class="card-body">

                        <form onSubmit={signUp}>

                            <div class="mt-4">

                                <div class="flex items-center">
                                    <MdTitle size={25}/>
                                    <input type="text" placeholder="Enter Name" class="w-full px-4 py-2 mt-2 ml-2 rounded border" onChange = {(e) => {
                                        setUserName(e.target.value)
                                    }} required/>
                                </div>

                                <div class="flex items-center">
                                    <MdOutlineMailOutline size={25}/>
                                    <input type="text" placeholder="Enter Email" class="w-full px-4 py-2 mt-2 rounded border" onChange = {(e) => {

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

                                <div class="flex items-center">
                                    <BiLockOpenAlt size={25}/>
                                    <input type="password" placeholder="Enter Password" class="w-full px-4 py-2 mt-2 ml-2 rounded border" onChange = {(e) => {
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

                                <div class="flex items-center">
                                    <BiLockAlt size={25}/>
                                    <input type="password" placeholder="Confirm Password" class="w-full px-4 py-2 mt-2 ml-2 rounded border" onChange = {(e) => {
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

                                <button type="submit" class="btn btn-dark px-6 py-2 mt-4 w-100" disabled={errorMessage !== "" || userPass === "" || userEmail === "" || userName === ""}>SignUp</button>
                            
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Signup;
