import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    data:[],
    error: null,
    isLoading: false,
  };
  console.log('initialState todoSlice', initialState)

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        postTodo: (state,action) => {
            console.log('state postTodo', postTodo)
            console.log('action', action)
            state.data = [...state.data, action.payload]
        }
    }
})

export const {postTodo} = todoSlice.actions
export default todoSlice.reducer