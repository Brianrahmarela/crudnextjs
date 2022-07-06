import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	data: [],
	error: null,
	isLoading: false
};
console.log("initialState todoSlice", initialState);

export const todoSlice = createSlice({
	name: "todo",
	initialState: initialState,
	reducers: {
		postTodo: (state, action) => {
			state.data = [...state.data, action.payload];
		},
		putTodo: (state, action) => {
			let filteredTodo = state.data.filter(
				(item) => item.id !== action.payload.id
			);
			state.data = [...filteredTodo, action.payload];
		},
		deleteTodo: (state, action) => {
			console.log("state TODO", state);
			console.log("state TODO data", state.data);
			console.log("action TODO", action);
			console.log("action.payload TODO", action.payload);
			if (Object.keys(action.payload).length === 0) {
				console.log("payload obj kosong {}");
				state.data = [];
			} else {
				console.log("obj tdk kosong");
				state.data = [...action.payload];
			}
		}
	}
});

export const { postTodo, putTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
