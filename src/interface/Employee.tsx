// export interface Employee {
//   name: string;
//   salary: string;
//   department: string;
// }

export interface Employee{
  id: number,
  name: string,
  salary: number,
  department: string
}

export interface EmployeeState{
  employees: Employee[],
  singleEmployee : Employee | null
}