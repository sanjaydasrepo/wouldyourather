export const SET_AUTH_USER='SET_AUTH_USER';
export const GET_AUTH_USER='GET_AUTH_USER';

export function setAuthedUser( id ){
    return{
        type:SET_AUTH_USER ,
        id
    }
}
export function getAuthedUser(){
    return{
        type:GET_AUTH_USER
    }
}