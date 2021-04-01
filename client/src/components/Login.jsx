import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const {username, password} = this.state;
    const {login, signup} = this.props
    e.preventDefault();
    if (e.target.value === 'Sign Up') {
      signup(username, password)
    } else {
      login(username, password)
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {username, password} = this.state
    const {loginFailed, signupFailed} = this.props
    return (
      <div id="loginPage">
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <input type="username" value={username} name={'username'} onChange={this.handleChange}/>
          <input type="password" value={password} name={'password'} onChange={this.handleChange}/>
          <input type="submit" value="Log in" onClick={this.handleSubmit}/>
          <input type="submit" value="Sign Up" onClick={this.handleSubmit}/>
        </form>
        {loginFailed && <div id="loginFailed">{loginFailed}</div>}
        {signupFailed && <div id="signupFailed">{signupFailed}</div>}
      </div>
      )
    }
}

export default Login;
