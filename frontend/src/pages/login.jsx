import React,{useState} from 'react';
import '../style.css';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const [email,setEmail] = useState(undefined);
  const [pass,setPass] = useState(undefined);

  const signIn = (e) =>{
    Navigate("/home")
  }

    return (
        
        <section className="login-block">
            <br></br>
            <br></br>
        <div className="container">
        <div className="row">
            <div className="col-md-4 login-sec">
                <h2 className="text-center">Login</h2>
  <form classMame="login-form" action={signIn}>
      <div className="form-group">
        <label for="exampleInputEmail1" className="text-uppercase mb-2" onChange={(e)=>{ setEmail(e.target.value) }}>Username</label>
        <input type="text" className="form-control mb-3" placeholder=""/>
        
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1" className="text-uppercase mb-2">Password</label>
        <input type="password" className="form-control" placeholder=""/>
      </div>
      
      
        <div className="form-check">
        <label className="form-check-label mt-1">
          <input type="checkbox" className="form-check-input" />
          <small>Remember Me</small>
        </label>
        <br></br>
        <br/>
        <button type="submit" className="btn-login float-right" onClick={signIn}>Submit</button>
        <br></br>
        <a href="\signUp">Sign Up?</a>
      </div>
     
    </form> 

           </div>
            <div class="col-md-7 banner-sec">
            <img class="d-block img-fluid" id="login-img" src="https://images.pexels.com/photos/1572036/pexels-photo-1572036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height="100%" alt=""/>
      
            <h2 class="centered">Welcome to Enlivened!</h2>
            <p class="paragraph">A place where you can find your social community, encourage one another, build confidence, create and attend activities.</p>   
            </div>
    </div>
    </div> 
    </section>
    );
}

export default Login;
