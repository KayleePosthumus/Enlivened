import React from 'react';
import logo from '../logo/enlivened.png'

const Navbar = () => {
    return (

      <nav class="navbar navbar-dark navbar-expand-lg bg-dark">   
        <div class="container-fluid">

            <div class="container-fluid">
                <div className="d-flex">
                    <a class="brand">
                        <img src={logo} alt="" width="130"/>
                    </a>
                </div>
            </div>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>      

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link mx-2" href="/settings">Settings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Logout</a>
                    </li>
                </ul>
            </div>   
        </div>
      </nav>
    
    );
}

export default Navbar;

