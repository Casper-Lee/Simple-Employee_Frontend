import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux"
import employeeReducer from './employeeSlice'
import userReducer from './userSlice'
// import { apiSlice } from './apiSlice'
// import authReducer from './authSlice'

export const store = configureStore({
    reducer:{
        employee: employeeReducer,
        user: userReducer, 
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector