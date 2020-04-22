import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {getUnAnsweredQuestions, getAnsweredQuestions} from '../utils/helper';
import Question from './Question';
import LeaderBoard from './LeaderBoard';
import SignIn from './SignIn';

class Dashboard extends Component {
  state = {
    active: 'unanswered',
  };
  getHomeLayout () {
    const {answered, unAnswered} = this.props;
    return (
      <div className="home-layout">

        <Tabs className="tabs-container">
          <TabList>
            <Tab>Unanswered</Tab>
            <Tab>Answered</Tab>
          </TabList>
 
          <TabPanel>
            <ul className="question-list">
              {unAnswered.map (ans => (
                <li key={ans}> <Question id={ans} /> </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel>
            <ul className="question-list">
              {answered.map (ans => <li key={ans}> <Question id={ans} /> </li>)}
            </ul>
          </TabPanel>
        </Tabs>

        <LeaderBoard />
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.props.authedUser === null
          ? <SignIn/>
          : this.getHomeLayout ()}
      </div>
    );
  }
}

const mapStateToProps = ({authedUser, questions, users}) => {
 
  const answeredIds = authedUser && Object.keys( users ).length > 0 ? Object.keys (users[authedUser].answers) : []

  return {
    authedUser,
    answered: getAnsweredQuestions (answeredIds, questions),
    unAnswered: getUnAnsweredQuestions (answeredIds, questions),
  };
};

export default connect (mapStateToProps) (Dashboard);

