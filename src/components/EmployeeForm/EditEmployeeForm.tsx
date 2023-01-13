import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../../store/employeeSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
// import { Status } from "../../store/employeeSlice";

import Card from "../Card/Card";
import classes from "./EmployeeForm.module.css";
import { toast } from 'react-toastify';

// https://stackoverflow.com/questions/55677600/typescript-how-to-pass-object-is-possibly-null-error
const EditEmployeeForm: React.FC = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory()
  const { singleEmployee } = useAppSelector((state) => state.employee);
  const  {status}  = useAppSelector((state) => state.employee)
  const notify = (msg: string) => toast(msg)
  // const { id }: any = useParams();

  
  // console.log("Id: ", id);
  //console.log('status:', status)

  // if(status === 'pending'){
  //   console.log('PENDING!!!! HELLLLOOOO')
  // }

  const params: {
    employeeId: string;
  } = useParams();

//   console.log("Edit params", params);

  useEffect(() => {
    // if(!params.employeeId) return;
    dispatch(getEmployeeById(parseInt(params.employeeId)));
  }, [dispatch, params.employeeId]);

  useEffect(() => {
    setEmployeeInitialState();
  }, [singleEmployee]);

  const [employee, setEmployee] = useState({
    name: "",
    salary: 0,
    department: "",
  });

  const setEmployeeInitialState = () => {
    if (!singleEmployee) return; //if null, return
    setEmployee({
      name: singleEmployee?.name,
      salary: singleEmployee?.salary,
      department: singleEmployee?.department,
    });
  };

  // useEffect(() => {
  //   console.log("Single Employee: ", employee);
  // }, [employee])

  // const checkEmployeeRejected = () => {
  //   if(status === 'rejected'){
  //     console.log('Hello REJECTEDDDD')
  //     notify('Employee Rejected')
  //   }else if(status === 'fulfilled') {
  //     notify('Employee Updated!')
  //     history.push('/')
  //   }
  // }

  useEffect(() => {
    // checkEmployeeRejected()
    if(status === 'rejected'){
      console.log('Employee Rejected:', status)
      notify('Employee Rejected')
    }else if(status === 'fulfilled') {
      console.log('Employee updated:', status)
      notify('Employee Updated!')
      history.push('/')
    }
  },[status, history])



  const submitHandler = (event: any) => {
    event.preventDefault();
    
    let data = {
      id: parseInt(params.employeeId),
      name: employee.name,
      salary: employee.salary,
      department: employee.department,
    };
    // checkEmployeeRejected()
    dispatch(updateEmployee(data));
    // console.log('employee details:', params.employeeId, employee.name, employee.salary, employee.department)
    // console.log('Data:', data)
    // history.push('/')
  };

  // if(status === 'rejected'){
  //   console.log('REJECTEDDDDD!!!! HELLLLOOOO')
  // }


  // console.log('params emp id',params.employeeId);

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            // defaultValue={employee.name}
            value={employee.name}
            type="text"
            id="name"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="salary">Salary</label>
          <input
            onChange={(e) =>
              setEmployee({ ...employee, salary: Number(e.target.value) })
            }
            value={employee.salary}
            id="salary"
            min="0"
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="department">Department</label>
            <select name="department" id="department"  value={employee.department} onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }>
              <option value="HR">HR</option>
              <option value="PS">PS</option>
            </select>

          {/* <textarea
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            value={employee.department}
            id="department"
          ></textarea> */}
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler} className="btn">
            Update Employee
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EditEmployeeForm;
