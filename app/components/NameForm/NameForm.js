import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Checkbox from 'material-ui/lib/checkbox'
import './NameForm.scss'

const fieldStyle = { width: '80%' };
const buttonStyle = { width: '100%' };

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    errors: {
      username: null
      },
    username: '',

  };

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    userNameOnly: PropTypes.bool,
  };

  handleInputChange = (name, e) => {
    e.preventDefault();
    console.log(name, e.target.value);

    this.setState({
      [name]: e.target.value,
    });
    if (e.target.value && this.state.errors.username) {
      this.setState({
        errors: { username: null },
      });
    }
  };

  handleLogin = e => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const { username } = this.state;
    console.log(username);
    if (!username || username == '') {
      return this.setState({
        errors: { username: 'Username required' }
      })
    }

    const loginData = { username };
    // console.log(this.props.onLogin, '\b', loginData, '\b', this.state,'\b', loginData);

    this.props.onLogin(loginData)
  };

  render () {
    return (
      <form className="LoginForm" onSubmit={ this.handleLogin }>
        <TextField
          hintText="Name"
          floatingLabelText="Username"
          onChange={ this.handleInputChange.bind(this, 'username') }
          errorText={ this.state.errors.username }
          style={ fieldStyle }
        />
        <div className="LoginForm-Submit">
          <RaisedButton
            label="Login"
            primary={ true }
            type="submit"
            disabled={ this.props.account && this.props.account.isFetching}
            style={ buttonStyle }
          />
        </div>
      </form>
    )
  }
}
