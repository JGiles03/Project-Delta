import { Link, useNavigate } from "react-router-dom";
import { mockLogIn, usernameExists, validPassword } from "../../services/auth";
import { useState } from "react";



export default function LoginPage() {
  const navigate = useNavigate()
    const [usernameText, setUsernameText] = useState<string>('')
    const [passwordText, setPasswordText] = useState<string>('')
    const [messageBox, setMessageBox] = useState<string>('')

function handleSubmit(e : React.SubmitEvent){
  e.preventDefault()

  if(usernameText.trim() === "" || passwordText.trim() === ""){
    setMessageBox('Please input a username and password!')
    return
  }

  if (!usernameExists(usernameText)){
    setMessageBox('Username not found!')
    return
  }

  if(!validPassword(passwordText)){
    setMessageBox('Invalid password!')
    return
  }

  mockLogIn({username: usernameText, password: passwordText})
  setMessageBox('login successful')
  setTimeout(()=>{
      navigate('/home')
  }, 2000)

}

  return (
  <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Log in to continue planning with Child & Me</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            //required
            value={usernameText}
            onChange={(e) => setUsernameText(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            //required
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
