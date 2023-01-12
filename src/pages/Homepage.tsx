import React, { Fragment } from 'react'
import EmployeeList from '../components/EmployeeList/EmployeeList'

// const DUMMY_DATA = [
//   {id: '1', name: 'Casperino', salary: '500000', department: 'PS'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'},
//   {id: '2', name: 'Ghost', salary: '350000', department: 'HR'}
// ]


const Homepage = () => {
  return (
      //  <EmployeeList employee={DUMMY_DATA}/>
    <Fragment>
      <EmployeeList />
    </Fragment>
  )
}

export default Homepage