import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/Authentication/Auth'


export const store= configureStore({
  reducer:{
    auth:authReducer

  }
})
