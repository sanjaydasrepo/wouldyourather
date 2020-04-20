import {
  RECEIVE_USERS,
  UPDATE_USER_ANSWERED_QUESTION,
  ADD_QUESTION_TO_USER,
} from '../actions/users';

export default function (state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USER_ANSWERED_QUESTION:
      const {authedUser, qid, answer} = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_QUESTION_TO_USER:
      
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat ([
            action.question.id,
          ]),
        },
      };
    default:
      return state;
  }
}
