import { Link, useNavigate } from "react-router-dom";
import {  signUp } from "../../services/auth";
import { useState } from "react";



export default function SignupPage() {
  const navigate = useNavigate()

  const [emailText, setEmailText] = useState<string>('')
  const [passwordText, setPasswordText] = useState<string>('')
  const [conPasswordText, setConPasswordText] = useState<string>('')
  const [messageBox, setMessageBox] = useState<string>('')

async function handleSubmit(e : React.SubmitEvent){
    e.preventDefault()
    
    
    if (passwordText !== conPasswordText){
      setMessageBox('Please make sure the passwords match!');
      return;
    } 
    try{

      await signUp({email : emailText, password: passwordText});

      setMessageBox('Signup successful')
      setTimeout(()=>{
        navigate('/login')
      }, 2000)
      
    } catch (err){
      setMessageBox('This email is already assigned to an account')
    }
}

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p>Join Child & Me to start planning your next adventure</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={passwordText}
            onChange={(e) => setPasswordText(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            required
            value={conPasswordText}
            onChange={(e) => setConPasswordText(e.target.value)}
          />
          <button type="submit" className="btn-primary">Sign up</button>
        </form>

        {messageBox && <div className="message-box">{messageBox}</div>}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
        <Link to='/'>Back</Link>
      </div>
    </div>
  );
}
