import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const[loading,setLoading]=useState(false);
  const auth = getAuth();
  const navigate=useNavigate();
  const login=async()=>{
    try{
      setLoading(true)
      const result=await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('currentUser',JSON.stringify(result))
      setLoading(false)
      toast.success("Login Success");
      navigate("/");
    }
    catch(error){
      console.log(error);
      toast.error("Login Failed")
      setLoading(false)
    }
  }
  return (
    <div className="loginfull">
       {loading && <Loading/>}
      <div className="row ">
        <div className="col-md-5 z1 ">
          <div className="login-form">
            <h2>LOGIN</h2>
            <hr />
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="my-3" onClick={login}>LOGIN</button>
            {/* <button onClick={()=>navigate("/register")} className="mx-3">Register</button> */}
            <hr/>
            <Link to="/register">Click here to Register</Link>
          </div>
        </div>
        <div className="col-md-5 login-animation">
          <lottie-player
            src="https://assets3.lottiefiles.com/private_files/lf30_otdghgza.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="login-bottom"></div>
    </div>
  );
};

export default LoginPage;
