import React from 'react';
import '../style.css';

const Login = () => {
    return (
        
        <section class="login-block">
            <br></br>
            <br></br>
        <div class="container">
        <div class="row">
            <div class="col-md-4 login-sec">
                <h2 class="text-center">Login</h2>
                <form class="login-form">
      <div class="form-group">
        <label for="exampleInputEmail1" class="text-uppercase">Username</label>
        <input type="text" class="form-control" placeholder=""/>
        
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="text-uppercase">Password</label>
        <input type="password" class="form-control" placeholder=""/>
      </div>
      
      
        <div class="form-check">
        <label class="form-check-label">
          <input type="checkbox" class="form-check-input" />
          <small>Remember Me</small>
        </label>
        <br></br>
        <br/>
        <button type="submit" class="btn-login float-right">Submit</button>
      </div>
     
    </form> 

           </div>
            <div class="col-md-8 banner-sec">
            <img class="d-block img-fluid" src="https://thumbs.dreamstime.com/b/green-leaves-pattern-vine-creeping-plant-growth-black-brick-wall-background-copy-space-green-leaves-pattern-vine-199923224.jpg" width="8000" height="8000" alt="First slide"/>
      
            <h2 class="centered">Welcome to Enlivened!</h2>
            <p class="paragraph">A place where you can find your social community, encourage one another, build confidence, create and attend activities.</p>
     
          
        
    
                
            </div>
    </div>
    </div> 
    </section>
    );
}

export default Login;
