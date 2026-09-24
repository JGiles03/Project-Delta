import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../services/auth";
import { useState } from "react";



export default function LoginPage() {
  const navigate = useNavigate()
    const [emailText, setEmailText] = useState<string>('')
    const [passwordText, setPasswordText] = useState<string>('')
    const [messageBox, setMessageBox] = useState<string>('')

async function handleSubmit(e : React.SubmitEvent){
  e.preventDefault()

try{
  await logIn({email: emailText, password: passwordText})
  setMessageBox('login successful')
  setTimeout(()=>{
    navigate('/map')
  }, 800)
} catch (err){
  setMessageBox('Invalid Email or password')
}

}

  return (
  <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Log in to continue planning with Child & Me</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
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
          <button type="submit" className="btn-primary">Log in</button>
        </form>

        {messageBox && <div className="message-box">{messageBox}</div>}

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
        <Link to='/'>Back</Link>
      </div>
    </div>
  );
}
