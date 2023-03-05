import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import EditEmployeeForm from '../components/EmployeeForm/EditEmployeeForm'
import { getToken } from '../store/handler'

const EditEmployee = () => {
  const history = useHistory()
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
  
  const token = getToken()
  if (!token) {
    // redirect to error page
    history.push('/error');
  }
  return (
   <Fragment>
    <h1>Update Employee</h1>
    {/* <p>{params.employeeId}</p> */}
    <EditEmployeeForm />
   </Fragment>
  )
}

export default EditEmployee