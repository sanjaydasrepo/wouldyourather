import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

export default function Nav({user}) {
  const getUserComponent = () => {
    return (
      <Fragment>

        <li className='user-avatar'>
          <img src={user.avatar} alt="Avatar" className="avatar" />
          { user.name }
        </li>
        <li>
          <NavLink to="/logout" activeClassName="active">
            Logout
          </NavLink>
        </li>
      </Fragment>
    );
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
            New question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
        {user && getUserComponent ()}
      </ul>
    </nav>
  );
}
