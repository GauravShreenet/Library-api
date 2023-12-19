import ReviewScheme from './ReviewScheme.js';

//Create
export const createReview = (reviewObj) => {
    return ReviewScheme(reviewObj).save()
}

//read @filter must be an object
// export const getAReview = (filter) => {
//     return ReviewScheme.findOne( filter )
// }

export const getManyReview = (filter) => {
    return ReviewScheme.find( filter )
}

export const updateReview = (filter, update) => {
    return ReviewScheme.findOneAndUpdate( filter, update )
}

//delete
export const deleteReview = (filter) => {
    return ReviewScheme.findOneAndDelete( filter )
}