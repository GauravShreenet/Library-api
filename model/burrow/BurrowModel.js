import BurrowScheme from './BurrowScheme.js';

//Create
export const createBurrow = (burrowObj) => {
    return BurrowScheme(burrowObj).save()
}

//read @filter must be an object
export const getABurrow = (filter) => {
    return BurrowScheme.findOne( filter )
}

export const getManyBurrow = (filter) => {
    return BurrowScheme.find( filter )
}

export const updateBurrow = (filter, update) => {
    return BurrowScheme.findOneAndUpdate( filter, update )
}

//delete
export const deleteBurrow = (filter) => {
    return BurrowScheme.findOneAndDelete( filter )
}