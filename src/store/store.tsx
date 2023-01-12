import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux"
import employeeReducer from './employeeSlice'

export const store = configureStore({
    reducer:{
        employee: employeeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector