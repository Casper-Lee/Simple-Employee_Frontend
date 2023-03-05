import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee, EmployeeState } from "../interface/Employee";
import { setAuthorizationToken, setToken } from "./handler";

export enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

const initialState: EmployeeState = {
  employees: [],
  singleEmployee: null,
  status: Status.PENDING,
  errMsg: "",
};

export const getAllEmployees = createAsyncThunk(
  "employee/fetch",
  async (_, thunkAPI) => {
    try {
      setAuthorizationToken()
      const response = await axios.get("http://localhost:3000/employee/");
      // console.log('NiHao')
      console.log('Response:', response.data)
      return response.data.employee;
      
    } catch (error) {
      console.log('ERROR:', error)
      console.log('AnnyeongHaseyo')
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const getEmployeeById = createAsyncThunk(
  "employee/fetchById",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/employee/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const createEmployee = createAsyncThunk<Employee, Object>(
  "employee/createEmployee",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/employee/",
        data
      );
      thunkAPI.dispatch(getAllEmployees());
      return response.data.employees;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const updateEmployee = createAsyncThunk<Employee, Object | any>(
  "employee/updateEmployee",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/employee/${data.id}`,
        {
          name: data.name,
          salary: data.salary,
          department: data.department,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/employee/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw error
    }
  }
);

export const employeeSlice: any = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // setEmployees : (state, action: PayloadAction<employee[]>) => {
    //     state.employee = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployees.pending, (state, action) => {
      state.status = Status.PENDING;
      console.log("pending get all employees");
    });
    builder.addCase(getAllEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
      console.log(action.payload)
      // state.status = Status.FULFILLED;
      console.log("get all employee fulfilled");
    });
    builder.addCase(getAllEmployees.rejected, (state, action) => {
      // console.log("Status rejected", action.payload);
      // state.status = Status.REJECTED;
    });
    builder.addCase(getEmployeeById.pending, (state, action) => {
      console.log("pending getting employee by ID");
      // state.status = Status.PENDING;
    });
    builder.addCase(getEmployeeById.fulfilled, (state, action) => {
      state.singleEmployee = action.payload;
      // state.status = Status.FULFILLED;
      console.log("get employee by id fullfilled");
    });
    builder.addCase(getEmployeeById.rejected, (state, action) => {
      console.log("get employee by id rejected");
      // state.status = Status.REJECTED;
    });
    builder.addCase(createEmployee.pending, (state, action) => {
      console.log("Create Employee pending");
      state.status = Status.PENDING;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      console.log("create Employee fullfilled");
      state.status = Status.FULFILLED;
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      console.log("create Employee rejected");
      state.errMsg = action.payload;
      state.status = Status.REJECTED;
      console.log("create employee rejected:", state.errMsg);
    });
    builder.addCase(updateEmployee.pending, (state, action) => {
      console.log("pending updating employee");
      state.status = Status.PENDING;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      state.singleEmployee = action.payload;
      console.log("employee updated");
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.errMsg = "Rejected";
      console.log("employee updated rejected");
      state.status = Status.REJECTED;
      // console.log('SliceRejected',state.status = Status.REJECTED);
    });
    builder.addCase(deleteEmployee.pending, (state, action) => {
      console.log("employee deleted pending");
      state.status = Status.PENDING;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      console.log("Employee deleted");
      state.status = Status.FULFILLED;
      // state.singleEmployee = action.payload
      // console.log('deleteemployee: ',action.payload)
      // console.log('deleteemployee: ',state.singleEmployee)
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      console.log("Employee cant be deleted");
      state.status = Status.REJECTED;
    });
  },
});

export default employeeSlice.reducer;
