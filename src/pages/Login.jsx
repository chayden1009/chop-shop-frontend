
const Login = ({ onSubmit }) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit"/>
      </form>
    </div>
  )
}


export default Login