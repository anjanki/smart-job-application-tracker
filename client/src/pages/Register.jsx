import { Link } from "react-router-dom"

function Register() {
  return (
    <div>
      <h2>Register Page</h2>

      <p>Already have an account?</p>
      <Link to="/">Go to Login</Link>
    </div>
  )
}

export default Register