import React from 'react'
import http from 'superagent'

export class Login extends React.Component {

  constructor () {
    super()
    this.state = {
      user: '',
      password: ''
    }
  }

  setUser = e => {
    this.setState({user: e.target.value})
  }

  setPassword = e => {
    this.setState({password: e.target.value})
  }

  // This will be called when the user clicks on the login button
  login = e => {
    e.preventDefault()

    http
      .post('/api-token-auth/')
      .send({
        username: this.state.user,
        password: this.state.password
      })
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        return console.log(response)
      })
  }

  render () {
    return (
      <div>
        <form role="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              defaultValue={this.state.user}
              onChange={this.setUser} />
            <input
              type="password"
              placeholder="Password"
              onChange={this.setPassword} />
          </div>
          <button type="submit" onClick={this.login}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Login
