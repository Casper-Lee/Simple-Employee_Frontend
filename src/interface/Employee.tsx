import { Status } from "../store/employeeSlice"
export interface Employee{
  id: number,
  name: string,
  salary: number,
  department: string
}

export interface EmployeeState{
  employees: Employee[],
  singleEmployee : Employee | null
  status: Status
  errMsg: any
}