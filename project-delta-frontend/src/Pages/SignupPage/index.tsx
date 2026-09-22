import { Link, useNavigate } from "react-router-dom";
import { mockSignUp, usernameExists } from "../../services/auth";
import { useState } from "react";



export default function SignupPage() {
  const navigate = useNavigate()

  const [usernameText, setUsernameText] = useState<string>('')
  const [passwordText, setPasswordText] = useState<string>('')
  const [conPasswordText, setConPasswordText] = useState<string>('')
  const [messageBox, setMessageBox] = useState<string>('')

function handleSubmit(e : React.SubmitEvent){
    e.preventDefault()
    
    if(usernameExists(usernameText)) {
      setMessageBox('This username already exists!');
      return;
    }
    
    if (passwordText !== conPasswordText){
      setMessageBox('Please make sure the passwords match!');
      return;
    } 

    mockSignUp({username : usernameText, password: passwordText});
    setMessageBox('Signup successful')
   setTimeout(()=>{
    navigate('/login')
   }, 2000)
    
}

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p>Join Child & Me to start planning your next adventure</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={usernameText}
            onChange={(e) => setUsernameText(e.target.value)}
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
