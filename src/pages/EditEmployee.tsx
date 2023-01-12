import React, { Fragment } from 'react'
import EditEmployeeForm from '../components/EmployeeForm/EditEmployeeForm'

const EditEmployee = () => {
  // const dispatch = useAppDispatch()
  // const {employees} = useAppSelector(state => state.employee)
  // const { id } = useParams()

  // const params: {
  //   employeeId: string | undefined
  // } = useParams()

  // useEffect(() => {
  //   dispatch(getEmployeeById())
  // }, [dispatch])

  // console.log("params:", params);
  
  return (
   <Fragment>
    <h1>Update Employee</h1>
    {/* <p>{params.employeeId}</p> */}
    <EditEmployeeForm />
   </Fragment>
  )
}

export default EditEmployee