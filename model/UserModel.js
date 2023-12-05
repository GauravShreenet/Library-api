import UserScheme from './UserScheme.js';

//Create
export const createUser = (userObj) => {
    return UserScheme(userObj).save()
}

//read
export const getUserByEmail = (email) => {
    return UserScheme.findOne({ email })
}

export const getOneAdmin = (filter) => {
    return UserScheme.findOne(filter);
}

//update


//delete

//add refreshJWT
export const updateRefreshJWT = async (email, refreshJWT) => {
    console.log(email, refreshJWT)
    return await UserScheme.findOneAndUpdate({email}, {refreshJWT})
}