import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {_saveQuestionAnswer, _saveQuestion} from '../utils/_DATA';
import {updateUserAnswerdQuestion, addQuestionToUser} from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const VOTE_QUESTION = 'VOTE_QUESTION';

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion (question) {
  return async (dispatch, getState) => {
    dispatch (showLoading ());

    const {authedUser} = getState ();
    const q = {
      optionOneText: question.optionOneText,
      optionTwoText: question.optionTwoText,
      author: authedUser,
    };

    const newQuestion = await _saveQuestion (q);
    dispatch (hideLoading ());

    dispatch (addQuestion (newQuestion));
    dispatch (addQuestionToUser (authedUser, newQuestion));
  };
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
export function saveQuestionsAnswer({authedUser, qid, answer}) {
  return {
    type: VOTE_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleVoteQuestion (qid, answer) {
  return async (dispatch, getState) => {
    dispatch (showLoading ());
    const {authedUser} = getState ();
    const info = {
      authedUser,
      qid,
      answer,
    };

    await _saveQuestionAnswer (info);
    dispatch (updateUserAnswerdQuestion (info));
    dispatch (saveQuestionsAnswer (info));
    dispatch (hideLoading ());
  };
}
