import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {getOptionPrettifyText} from '../utils/helper';
import {Link} from 'react-router-dom';

class Question extends Component {
  render () {
    const {question, avatar, isLoading} = this.props;
  
    return (
      <Fragment>

        {isLoading === true
          ? ''
          : <div className="question">
              <p className="author-label"> {question.author} asks : </p>
              <div className="question-body">
                <div className="question-avatar">
                  <img src={avatar} alt="Avatar" />
                </div>
                <div className="question-details">
                  <h4> Would you rather ! </h4>
                  <div className="action-wrapper">
                    <p className="question-text">
                      {getOptionPrettifyText (question.optionOne.text)}
                    </p>

                    <Link to={`/question/${question.id}`} className="view-link">
                      View question
                    </Link>
                  </div>

                </div>
              </div>
            </div>}
      </Fragment>
    );
  }
}

const mapStateToProps = ({questions, users ,authedUser }, {id}) => {


  const question = Object.keys(questions).length > 0 ? questions[id] : '';


  const avatar = Object.keys( users ).length > 0 ?  users[question.author].avatarURL : '';

  return {
    question: question,
    avatar: avatar,
    isLoading: users.length > 0 ? true : false,
  };
};

export default connect (mapStateToProps) (Question);
