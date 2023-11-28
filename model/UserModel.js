import UserScheme from './UserScheme.js';

//Create
export const createUser = userObj => {
    return UserScheme(userObj).save()
}

//read
export const getUserByEmail = email => {
    return UserScheme.findOne({ email })
}

//update


//delete