import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/user'
import postReducer from '../store/post'

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer
  }
})