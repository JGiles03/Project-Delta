import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Child & ME</h1>
      <p>The only place needed to plan your next adventure with your kids </p>

      <Link to='/signup' > Signup</Link>
      <Link to='/login' >Login</Link>

    </div>
  )
}

//TODO
//Styling
//Flesh out intro text