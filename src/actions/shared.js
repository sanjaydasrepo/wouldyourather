import {_getQuestions, _getUsers} from '../utils/_DATA';
import {receiveQuestions} from './questions';
import {receiveUsers} from './users';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export function handleInitialData () {
  return dispatch => {
    dispatch (showLoading ());
    Promise.all ([_getQuestions (), _getUsers ()]).then (values => {
      dispatch (receiveQuestions (values[0]));
      dispatch (receiveUsers (values[1]));
      dispatch (hideLoading ());
    });
  };
}
