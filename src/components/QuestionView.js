import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {IoIosArrowForward} from 'react-icons/io';

import {
  isQuestionAnswered,
  getQuestionStats,
  getLoggedInUser,
} from '../utils/helper';

import {handleVoteQuestion} from '../actions/questions';
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn';

class QuestionView extends Component {
  state = {
    opt: '',
  };

  handleChange (e) {
    this.setState ({
      opt: e.target.value,
    });
  }
  handleSubmit (e) {
    e.preventDefault ();
    const {id} = this.props.question;
    if (this.state.opt) {
      this.props.dispatch (handleVoteQuestion (id, this.state.opt));
    }
  }

  getAnswerDetailsLayout () {
    const {question, questionStats, avatar} = this.props;
    const {totalVotes, opt1Stats, opt2Stats, votedOption} = questionStats;

    return (
      <div className="answered-details">
        <p className="author-label"> {question.author} asks : </p>
        <div className="question-body">
          <div className="question-avatar">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="question-details">
            <h4> Would you rather ! </h4>
            <div className="option-wrapper">
              <div className="option-stat one">
                <h5 className="option-text">

                  <IoIosArrowForward />

                  {opt1Stats.text}

                  {votedOption === 'optionOne' &&
                    <span className="voted-text">You voted </span>}

                </h5>
                <div className="stat-detail-wrapper">
                  <div className="stat-pb">
                    <CircularProgressbar
                      className="pb-circular"
                      value={opt1Stats.percentage}
                      text={`${opt1Stats.percentage}%`}
                    />
                  </div>
                  <div className="stat-text">
                    <p>  {opt1Stats.voteCount} out of {totalVotes} users </p>
                  </div>
                </div>
              </div>
              <div className="option-stat two">
                <h5 className="option-text">

                  <IoIosArrowForward />

                  {opt2Stats.text}

                  {votedOption === 'optionTwo' &&
                    <span className="voted-text">You voted </span>}
                </h5>
                <div className="stat-detail-wrapper">
                  <div className="stat-pb">
                    <CircularProgressbar
                      className="pb-circular"
                      value={opt2Stats.percentage}
                      text={`${opt2Stats.percentage}%`}
                    />
                  </div>
                  <div className="stat-text">
                    <p>  {opt2Stats.voteCount} out of {totalVotes} users </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getUnAnsweredLayout () {
    const {question, avatar} = this.props;

    return (
      <div className="answered-details">
        <p className="author-label"> {question.author} asks : </p>
        <div className="question-body">
          <div className="question-avatar">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="question-details">
            <h4> Would you rather ! </h4>
            <div className="option-wrapper">
              <form onSubmit={this.handleSubmit.bind (this)}>

                <div className="radio-group">
                  <div className="input-group">
                    <input
                      type="radio"
                      id="opt-1"
                      name="vote"
                      value="optionOne"
                      onChange={this.handleChange.bind (this)}
                    />
                    <label htmlFor="opt-1"> {question.optionOne.text} </label>

                  </div>
                  <div className="input-group">

                    <input
                      type="radio"
                      id="opt-2"
                      name="vote"
                      value="optionTwo"
                      onChange={this.handleChange.bind (this)}
                    />
                    <label htmlFor="opt-2"> {question.optionTwo.text} </label>
                  </div>
                  <button className="btn"> Vote </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getQuestionLayout () {
    return (
      <div className="question-view-container">
        {this.props.isAnswered
          ? this.getAnswerDetailsLayout ()
          : this.getUnAnsweredLayout ()}
      </div>
    );
  }
  render () {
    const {authedUser, isLoading , isQuestionKeyValid } = this.props;
  
    return (
      <div>
        {authedUser === null
          ? <SignIn/>
          : <div>
              {isLoading === true
                ? ''
                : <Fragment>
                    { isQuestionKeyValid ? this.getQuestionLayout () : <Redirect to="/not-valid"/> }
                  </Fragment>}
            </div>}

      </div>
    );
  }
}

const mapStateToProps = ({questions, authedUser, users}, {match}) => {
  const {params} = match;

  const isQuestionKeyValid = Object.keys (questions).some (
    q => questions[q].id === params.question_id
  );

  const isAnswered = isQuestionKeyValid && isQuestionAnswered (
    questions,
    params.question_id,
    authedUser
  );

  const question = isQuestionKeyValid && Object.keys (questions).length > 0
    ? questions[params.question_id]
    : '';

  const avatar = isQuestionKeyValid && Object.keys (users).length > 0
    ? users[question.author].avatarURL
    : '';

  return {
    isLoading: Object.keys (users).length > 0 ? false : true,
    isQuestionKeyValid,
    isAnswered: isAnswered,
    authedUser,
    questionStats: Object.keys (questions).length > 0 && isQuestionKeyValid
      ? getQuestionStats (questions[params.question_id], authedUser)
      : '',
    user: getLoggedInUser (authedUser, users),
    question: question,
    avatar: avatar,
  };
};

export default connect (mapStateToProps) (QuestionView);
