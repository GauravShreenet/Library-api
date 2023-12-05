import BookScheme from './BookScheme.js';

//Create
export const createBook = (bookObj) => {
    return BookScheme(bookObj).save()
}

//read @filter must be an object
export const getAllBook = () => {
    return BookScheme.find()
}
export const getABook = (filter) => {
    return BookScheme.findOne( filter )
}

//delete
export const deleteBook = (filter) => {
    return BookScheme.findOneAndDelete( filter )
}