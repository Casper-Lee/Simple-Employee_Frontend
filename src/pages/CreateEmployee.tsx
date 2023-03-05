import React from 'react'
import { useHistory } from 'react-router';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm'
import { getToken } from '../store/handler';

const CreateEmployee: React.FC = () => {
  const history = useHistory()
  // const addEmployeeHandler = (employeeData: any) => {
  //   console.log(employeeData)
  // }
  
  const token = getToken()
  if (!token) {
    // redirect to error page
    history.push('/error');
  }
  return (
    <EmployeeForm />
  )
}

export default CreateEmployee