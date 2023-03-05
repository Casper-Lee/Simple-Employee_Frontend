import React from 'react'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User{
  id: number,
  username: string,
  department_id:number
}

export interface UserState{
  users: User[]
}

const initialState: UserState = {
  users: [],
};


// export const getAllUsers = createAsyncThunk(
//   "User/fetch",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://localhost:3000/employee/");
//       console.log('nihao')
//       return response.data.users;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//       // throw error
//     }
//   }
// );


export const createUser = createAsyncThunk<User, Object>(
  "create/createUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      // thunkAPI.dispatch(getAllUsers());
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/fetchByUser",
  async (username: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/login`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const userSlice: any = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // setEmployees : (state, action: PayloadAction<employee[]>) => {
    //     state.employee = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      console.log("pending get all employees");
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.users = action.payload;
      // state.status = Status.FULFILLED;
      console.log("get all employee fulfilled");
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("Status rejected", action.payload);
      // state.status = Status.REJECTED;
    });
    builder.addCase(createUser.pending, (state, action) => {
      console.log("Create Employee pending");

    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log("create Employee fullfilled");
      // state.status = Status.FULFILLED;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      console.log("create Employee rejected");
    });
  },
});

export default userSlice.reducer;
