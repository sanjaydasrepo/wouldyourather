export const RECEIVE_USERS ='RECEIVE_USERS' ;
export const UPDATE_USER_ANSWERED_QUESTION ='UPDATE_USER_ANSWERED_QUESTION' ;
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers( users ){
    return{
        type:RECEIVE_USERS ,
        users
    }
}
export function updateUserAnswerdQuestion({ authedUser , qid , answer }){
    return{
        type:UPDATE_USER_ANSWERED_QUESTION ,
        authedUser ,
        qid ,
        answer
    }
} 
export function addQuestionToUser( authedUser , question ){
    return{
        type:ADD_QUESTION_TO_USER ,
        authedUser ,
        question
    }
} 

