import {SET_AUTH_USER} from '../actions/authedUser';
import {GET_AUTH_USER} from '../actions/authedUser';

const user = localStorage['authedUser'];

const initState = (user === undefined || user === '') ? null : user;

export default function (state = initState, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      if (action.id !== null) {
        localStorage.setItem ('authedUser', action.id);
      } else {
        localStorage.setItem ('authedUser', '');
      }
      return action.id;
    case GET_AUTH_USER:
      const localId = localStorage.getItem ('authedUser');
      if (localId !== 'none') {
        return localId;
      }
      return state;
    default:
      return state;
  }
}
