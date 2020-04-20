import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getLeaderBoardList} from '../utils/helper';

class LeaderBoard extends Component {
  getListItem (item) {
    
    return (
      <div className="item-wrapper">

        <h4> {item.name} </h4>
        <div
          className={`leader-list-item ${this.props.authedUser === item.id ? 'item-position' : ''}`}
        >
          <div>
            <img className="avatar-square" src={item.avatar} alt="Avatar" />
          </div>
          <div className="mid">
            <div className="mid-stats">
              <span> Asked </span>
              <span className="count-text"> {item.questionCount} </span>
            </div>
            <div className="mid-stats">
              <span> Answered </span>
              <span className="count-text"> {item.answersCount} </span>
            </div>

          </div>
          <div className="count">
            <span className="total-text"> {item.totalCount} </span>
          </div>
        </div>
      </div>
    );
  }

  getLeaderBoard () {
    const {list } = this.props;
    return (
      <div className="leaderboard">
        <ul>
          {list.map (item => (
            <li key={item.id}> {this.getListItem (item)} </li>
          ))}
        </ul>
      </div>
    );
  }
  render () {
    const { isLoading ,authedUser } = this.props;
    return (
      <div className="leaderboard">
        <h4> LeaderBoard </h4>
        { authedUser === null
          ? ''
          : <Fragment>
              { isLoading ? '': this.getLeaderBoard ()}
            </Fragment>}

      </div>
    );
  }
}

const mapStateToProps = ({authedUser, users}) => {
  const list = Object.keys (users).length > 0 ? getLeaderBoardList (users) : [];

  return {
    authedUser: authedUser,
    list,
    isLoading: list.length > 0 ? false : true,
  };
};

export default connect (mapStateToProps) (LeaderBoard);
