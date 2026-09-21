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
  })

}

  return (
    <div>
      LoginPage
      <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" required value={usernameText} onChange={(e) => setUsernameText(e.target.value)} />
            <input type="password" placeholder="Password" required value={passwordText} onChange={(e) => setPasswordText(e.target.value)} />
            <button>Submit</button>
          </form>
          <div className="message-box" >{messageBox}</div>
          <p>Don't have an account! sign up <Link to='/signup'>Here</Link> </p>
          </div>
  )
}
