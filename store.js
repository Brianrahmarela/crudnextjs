import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {createWrapper} from 'next-redux-wrapper'
import counter from './slices/counterSlice'
import todo from './slices/todoSlice'

// export const store = configureStore({
//     reducer: { counter: counterReducer}
// })

const combineReducer = combineReducers({
    counter,
    todo
})

export const makeStore = () => 
configureStore({
    reducer: combineReducer
})

export const wrapper = createWrapper(makeStore)