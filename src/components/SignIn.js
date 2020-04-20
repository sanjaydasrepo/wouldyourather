import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setAuthedUser} from '../actions/authedUser';

class SignIn extends Component {
  state = {
    val: null,
  };

  handleSubmit (e) {
    e.preventDefault ();
    this.props.dispatch (setAuthedUser (this.state.val));
    this.props.history.push ('/home');
  }
  handleChange (e) {
    const val = e.target.value || null;
    this.setState ({
      val: val,
    });
  }

  render () {
    const {users} = this.props;

    return (
      <div className="landing">
         
        <h2> Play would you rather !</h2>
          <form className="sign-in" onSubmit={this.handleSubmit.bind (this)}>
          <h4> Sign In</h4>
            <select onChange={this.handleChange.bind (this)}>
              <option key="" value=""> Select Username </option>
              {Object.keys (users).map (v => (
                <option key={users[v].id} value={users[v].id}>
                  {users[v].name}
                </option>
              ))}
            </select>
            <button className='btn'> Sign In </button>
          </form>
        
      </div>
    );
  }
}
const mapStateToProps = ({users}) => {
  return {
    users: users,
  };
};
export default connect (mapStateToProps) (SignIn);
