import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      LoginPage
      <form >
            <input type="text" placeholder="username" required/>
            <input type="text" placeholder="Password" required/>
            <button>Submit</button>
          </form>
          <div className="message-box" ></div>
          <p>Don't have an account! sign up <Link to='/signup'>Here</Link> </p>
          </div>
  )
}
