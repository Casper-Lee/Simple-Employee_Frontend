import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee, EmployeeState } from "../interface/Employee";

const initialState:EmployeeState = {
    employees: [],
    singleEmployee: null
}

export const getAllEmployees = createAsyncThunk(
    "employee/fetch",
    async(_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:3000/employee/")
            return response.data.employee
        } catch (error) {
            // return thunkAPI.rejectWithValue(error)
            throw error
        }
    }
)

export const getEmployeeById = createAsyncThunk(
    "employee/fetchById",
    async (id: number , thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3000/employee/${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    }
)

export const createEmployee = createAsyncThunk<Employee, Object>(
    "employee/createEmployee",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:3000/employee/", data)
            thunkAPI.dispatch(getAllEmployees())
            return response.data.employees 
        } catch (error) {
            // return thunkAPI.rejectWithValue(error)
            throw error
        }
    }
)

export const updateEmployee = createAsyncThunk<Employee, Object|any>(
    "employee/updateEmployee",
    async(data, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:3000/employee/${data.id}`, {
                name: data.name,
                salary: data.salary,
                department: data.department
            })
            return response.data
        } catch (error) {
            // return thunkAPI.rejectWithValue(error)
            throw error
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async(id : any, thunkAPI) =>{
        try {
            const response = await axios.delete(`http://localhost:3000/employee/${id}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
            // throw error
        }
    }
)


export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers:{
        // setEmployees : (state, action: PayloadAction<employee[]>) => {
        //     state.employee = action.payload
        // }
    },
    extraReducers: builder => {
        builder.addCase(getAllEmployees.pending, (state, action) => {
            console.log('pending get all employees')
        });
        builder.addCase(getAllEmployees.fulfilled, (state, action) => {
            state.employees = action.payload
            console.log('get all employee fulfilled')
        });
        builder.addCase(getAllEmployees.rejected, (state, action) => {
            console.log('Status rejected', action.payload)
        })
        builder.addCase(getEmployeeById.pending, (state,action) => {
            console.log('pending getting employee by ID')
        })
        builder.addCase(getEmployeeById.fulfilled, (state,action) => {
            state.singleEmployee = action.payload
            console.log('get employee by id fullfilled')
        })
        builder.addCase(getEmployeeById.rejected, (state, action) => {
            console.log('get employee by id rejected')
        })
        builder.addCase(updateEmployee.pending, (state, action) => {
            console.log('pending updating employee')
        })
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.singleEmployee = action.payload
            console.log('employee updated')
        })
        builder.addCase(updateEmployee.rejected, (state,action) => {
            console.log('employee updated rejected')
        })
        builder.addCase(deleteEmployee.pending, (state, action ) => {

            console.log('employee deleted pending')
        })
        builder.addCase(deleteEmployee.fulfilled, (state,action) => {
            console.log('Employee deleted')
            // state.singleEmployee = action.payload
            // console.log('deleteemployee: ',action.payload)
            // console.log('deleteemployee: ',state.singleEmployee)
        })
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            console.log('Employee cant be deleted')
        })
    }
})

export default employeeSlice.reducer