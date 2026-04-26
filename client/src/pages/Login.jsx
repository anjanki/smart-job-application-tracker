import { Link } from "react-router-dom"

function Login() {
  return (
    <>
      <h2>Login Page</h2>
      <Link to="/register">Go to Register</Link>
    </>
  )
}

export default Login