import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { signOut } from "../../services/auth"
import { getCurrentUserTEMP } from "../../services/auth";
import "./index.css";

export default function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      setIsLoading(false);
      return;
    }

  async function loadUser(email: any){
    try{
      const currentUser = await getCurrentUserTEMP(email)
      setUser(currentUser)

    } catch(err){
      setUser(null)
    }finally{
      setIsLoading(false)
    }
  }
    loadUser(email);
}, []);


  function handleSignOut() {
    signOut();
    navigate('/home');
  }

  if (isLoading) return <div className="account-message">Loading...</div>;

  if (!user) {
    return (
      <div className="account-page">
        <div className="account-card">
          <h1>You are not signed in</h1>
          <Link to="/login" className="btn-primary">Login Here</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-avatar">
          {user.email.charAt(0).toUpperCase()}
        </div>

        <h1>{user.email}</h1>
        <p className="account-member-since">
          Member since {new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>

        <div className="account-section">
          <h3>Your reviews</h3>
          <p className="placeholder-note">Coming soon</p>
        </div>

        <button onClick={handleSignOut} className="btn-secondary">Sign Out</button>
      </div>
    </div>
  );
}