import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const auth = getAuth();
  const register=async()=>{
    try{
      setLoading(true)
      const result=await createUserWithEmailAndPassword(auth, email, password);
      console.log(result)
      setLoading(false)
      toast.success("Registation Success")
      setEmail('');
      setPassword('');
      setConfirmPassword('')
      navigate("/login")
    }
    catch(error){
      console.log(error);
      toast.error("Registation Failed")
      setLoading(false)
    }
  }
  return (
    <div className="registerfull">
      {loading && <Loading/>}
      <div className="register-top"></div>
      <div className="row ">
        <div className="col-md-5 animation">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className="col-md-4 z1 ">
          <div className="register-form">
            <h2>Register</h2>
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="my-3" onClick={register}>REGISTER</button>
             {/* <button onClick={()=>navigate("/login") } className="mx-3">LOGIN</button> */}
             <hr/>
             <Link to="/login">Click here to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
