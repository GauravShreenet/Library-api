import BookScheme from './BookScheme.js';

//Create
export const createBook = (bookObj) => {
    return BookScheme(bookObj).save()
}

//read @filter must be an object
export const getAllBook = () => {
    return BookScheme.find()
}

export const getBookById = (filter) => {
    return BookScheme.findById(filter)
}

export const getABook = (filter) => {
    return BookScheme.findOne( filter )
}

export const updateBookById = ({_id, ...rest}) => {
    return BookScheme.findByIdAndUpdate( _id, rest );
}

//delete
export const deleteBook = (_id) => {
    return BookScheme.findByIdAndDelete( _id );
}