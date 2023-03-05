import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import EmployeeList from '../components/EmployeeList/EmployeeList'
import { getToken } from '../store/handler'

// const DUMMY_DATA = [
//   {id: '1', name: 'Casperino', salary: '500000', department: 'PS'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'}
// ]

// interface SignInProps {
//   setAuth: (authenticated: boolean) => void;
// }

const Homepage= () => {
  const history = useHistory()

  const token = getToken()
  if (!token) {
    // redirect to error page
    history.push('/error');
  }
  return (
      //  <EmployeeList employee={DUMMY_DATA}/>
    <Fragment>
      <EmployeeList />
    </Fragment>
  )
}

export default Homepage