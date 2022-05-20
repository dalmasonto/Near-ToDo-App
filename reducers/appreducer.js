import { createSlice } from '@reduxjs/toolkit'

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    todos: [],
  },
  reducers: {
    addtodo: (state, action) => {
      state.todos.push(action.payload)
    },

    settodos: (state, action) => {
      state.todos = action.payload
    }
  }
})

export const { addtodo, settodos } = AppSlice.actions;

export const selectApp = (state) => state.app;

export default AppSlice.reducer