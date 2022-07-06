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
            state.data = [...state.data, action.payload]
        },
        putTodo: (state,action) => {
            let filteredTodo = state.data.filter(
                (item) => item.id !== action.payload.id
            );
            state.data = [...filteredTodo, action.payload]
        },
        deleteTodo: (state,action) => {
            let filteredTodo = state.data.filter(
                (item) => item.id !== action.payload.id
            );
            console.log('filteredTodo', filteredTodo)
            console.log('state TODO', state.data)
            console.log('action TODO', action)
            console.log('action.payload TODO', action.payload)
            state.data = [...filteredTodo, action.payload]
        },

    }
})

export const {postTodo, putTodo, deleteTodo} = todoSlice.actions
export default todoSlice.reducer