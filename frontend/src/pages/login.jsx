import React from 'react';
import Navbar from './navbar';

const Login = () => {
    return (
        <div class="bg-light">
            <Navbar/>
            <div class="row d-flex justify-content-center mt-4">
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-header text-center h1">
                        Log In
                    </div>
                        <div class="card-body">
                            
                            <div class="flex-row d-flex mb-3 my-4 w-100">
                            <span class="input-group-addon fa-2x mx-3"><i class="fa fa-user"></i></span>
                            <input type="email" class="form-control" id="inputEmail" placeholder="Email"/>
                            </div>
                            <div class="flex-row d-flex mb-3 my-4 w-100">
                                <span class="input-group-addon fa-2x mx-3"><i class="fa fa-lock"></i></span>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
                            </div>
                            <div class="mb-3">
                                <div class="form-check mx-3">
                                    <input class="form-check-input" type="checkbox" id="checkRemember"/>
                                    <label class="form-check-label" for="checkRemember">Remember me</label>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-lg pull-right" onclick="login()">Sign in</button>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-4 mx-2">
                    <button class="btn btn-dark w-100 py-3">Sign Up</button>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default Login;
