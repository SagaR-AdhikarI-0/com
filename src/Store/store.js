import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/Authentication/Auth'
import cartSlice from '../Features/Cart/cartSlice'


export const store= configureStore({
  reducer:{
    auth:authReducer,
    cart:cartSlice

  }
})
