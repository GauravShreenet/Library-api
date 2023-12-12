import SessionScheme from './SessionScheme.js';

//Create
export const createSession = (sessionObj) => {
    return SessionScheme(sessionObj).save()
}

//read @filter must be an object
export const getSession = (filter) => {
    return SessionScheme.findOne( filter )
}

//delete
export const deleteSession = (filter) => {
    return SessionScheme.findOneAndDelete( filter )
}