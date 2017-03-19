import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userActions } from '../../actions/creators'

// Components
import NameForm from '../../components/NameForm/NameForm'
import Paper from 'material-ui/lib/paper'
import CircularProgress from 'material-ui/lib/circular-progress'
import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    snackCanOpen: false,
    errors: { username: null, password: null }
  };

  static contextTypes = {
    account: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.account && nextProps.account.username) {
      this.context.router.push(`/${nextProps.account.username}`)
    }
  }

  handleRequestClose = () =>
    this.setState({
      snackCanOpen: false,
    });

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true
    });
    this.props.onLogin(loginData);
    // event({ category: 'User', action: 'Email Login' })
  };

  render () {
    const { isFetching, error } = this.props.account || {};

    if (isFetching) {
      return (
        <div className="Login">
          <div className="Login-Progress">
            <CircularProgress  mode="indeterminate" />
          </div>
        </div>
      )
    }

    return (
      <div className='Home'>
        <h2>Welcome to gomoku-react-python</h2>
        <h3>Enter your name</h3>
        <p>The name should consists of at least four characters.</p>

        <div className="Login">
          <Paper className="Login-Panel">
            <NameForm
              onLogin={ this.handleLogin }
              userNameOnly
            />
          </Paper>
          <Snackbar
            open={ typeof error !== 'undefined' && this.state.snackCanOpen }
            message={ error || 'Error' }
            action="close"
            autoHideDuration={ 3000 }
            onRequestClose={ this.handleRequestClose }
          />
        </div>
        <br/>
        <br/>
        <Link to="/cars">Cars List Example</Link>
      </div>
    )
  }
}


// Place state of redux store into props of component
const mapStateToProps = (state) => {
  console.log(state);
  return {
    account: state.account,
    router: state.router
  }
};

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)
