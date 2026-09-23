import { useNavigate } from "react-router-dom"
import { signOut } from "../../services/auth"

export default function AccountPage() {
  const navigate = useNavigate()

  async function handleSignOut (){

    await signOut()
    navigate('/home')
  }
  
  return (
    <div>
      <h1>Welcome User</h1>
      <p>Check and update your profile here</p>
      <h3>List of requirements:</h3>
      <ul>
        <li>req1</li>
        <li>req2</li>
        <li>req3</li>
      </ul>
      <button onClick={(e)=>handleSignOut()} >Sign  Out</button>
    </div>
  )
}
