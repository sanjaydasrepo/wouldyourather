import React, {Component ,Fragment} from 'react';
import {handleAddQuestion} from '../actions/questions';
import {connect} from 'react-redux';
import SignIn from './SignIn';
class QuestionNew extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  };
  handleChange (e) {
    this.setState ({
      [e.target.name]: e.target.value || '',
    });
  }
  async handleSubmit (e) {
    e.preventDefault ();

    const {optionOneText, optionTwoText} = this.state;

    if (optionOneText && optionTwoText) {
      await this.props.dispatch (
        handleAddQuestion ({optionOneText, optionTwoText})
      );
      this.props.history.push ('/home');
    }
  }
  render () {
    return (
      <Fragment>
        {this.props.authedUser === null
          ? <SignIn/>
          : <div className="form-wrapper">
              <h3> Would you rather ? </h3>
              <form onSubmit={this.handleSubmit.bind (this)} className='form'>
                <div className="input-group">
                  <label htmlFor="opt1"> Enter question for option 1</label>
                  <input
                    type="text"
                    name="optionOneText"
                    id="opt1"
                    onChange={this.handleChange.bind (this)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="opt2"> Enter question for option 2</label>
                  <input
                    type="text"
                    name="optionTwoText"
                    id="opt2"
                    onChange={this.handleChange.bind (this)}
                  />
                </div>
                <button className="btn"> Save </button>
              </form>
            </div>}
      </Fragment>
    );
  }
}

const mapStateToProps = ({authedUser}) => {
  return {
    authedUser
  };
};

export default connect (mapStateToProps) (QuestionNew);
