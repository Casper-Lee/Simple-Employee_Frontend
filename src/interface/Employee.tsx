import { Status } from "../store/employeeSlice"
export interface Employee{
  id: number,
  name: string,
  salary: number,
  department_id: number
}
export interface EmployeeState{
  employees: Employee[],
  singleEmployee : Employee | null
  status: Status
  errMsg: any
}
export interface User{
  id: number,
  username: string,
  department_id:number
}

export interface UserState{
  users: User[]
}