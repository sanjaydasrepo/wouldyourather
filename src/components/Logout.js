import {Component} from 'react';
import {connect} from 'react-redux';
import {setAuthedUser} from '../actions/authedUser';

class Logout extends Component {
  componentDidMount () {
    this.props.dispatch (setAuthedUser (null));
    this.props.history.push ('/');
  }
  render () {
    return '';
  }
}
export default connect (null) (Logout);
