import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LoadingBar from 'react-redux-loading-bar';
import Nav from './Nav';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import {handleInitialData} from '../actions/shared';
import {getLoggedInUser} from '../utils/helper';
import Logout from './Logout';
import QuestionView from './QuestionView';
import QuestionNew from './QuestionNew';
import LeaderBoard from './LeaderBoard';
import NoMatch from './NoMatch';
const history = createBrowserHistory ();

class App extends Component {
  componentDidMount () {
    this.props.dispatch (handleInitialData ());
  }
  render () {
    return (
      <Router history={history}>
        <Fragment>

          <div className="container">
            <header>
              <LoadingBar />
            </header>

            <Nav user={this.props.user} />

            <div className="base-layout">

              <Fragment>
                <Switch>
                 
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/logout" component={Logout} />
                  <Route exact
                    path="/question/:question_id"
                    component={QuestionView}
                  />
                  <Route path="/add" exact component={QuestionNew} />
                  <Route path="/leaderboard" exact component={LeaderBoard} />
                  <Route path="*">
                    <NoMatch />
                  </Route>
                </Switch>
              </Fragment>
            </div>
          </div>

        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({authedUser, users}) {
  const user = getLoggedInUser (authedUser, users);
  return {
    authedUser: authedUser,
    user: user,
  };
}

export default connect (mapStateToProps) (App);
