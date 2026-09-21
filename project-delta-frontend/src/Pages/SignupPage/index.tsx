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
    <div>
      SignupPage
    <form onSubmit={handleSubmit} >
      <input type="text" placeholder="username" required value={usernameText} onChange={(e) => setUsernameText(e.target.value)}/>
      <input type="password" placeholder="Password" required value={passwordText} onChange={(e) => setPasswordText(e.target.value)} />
      <input type="password" placeholder="confirm Password" required value={conPasswordText} onChange={(e) => setConPasswordText(e.target.value)}/>
      <button>Submit</button>
    </form>
    <div className="message-box" >{messageBox}</div>
    <p>Already have an Account! Please login <Link to='/login'>here</Link> </p>
    </div>
  )
}
