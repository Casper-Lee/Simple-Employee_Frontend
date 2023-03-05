import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createEmployee } from "../../store/employeeSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from 'react-toastify';

import Card from "../Card/Card";
import classes from "./EmployeeForm.module.css";

const EmployeeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory()
  const {status}: any  = useAppSelector((state) => state.employee)
  const {errMsg}: any = useAppSelector((state) => state.employee)
  const notify = (msg: string) => toast(msg)

  // console.log('Error Message:',errMsg)

  const [employee, setEmployee] = useState({
    name: "",
    salary: 0,
    // department: ['HR', 'PS']
    department_id: "1",
  });

  useEffect(() => {
    if(status === 'rejected'){
      console.log('Employee Rejected:', status)
      console.log(errMsg.response.data)
      notify(errMsg.response.data.message)
      notify('Cannot Create Employee')
    }else if(status === 'fulfilled') {
      console.log('Employee updated:', status)
      notify('Employee created!')
      history.push('/employee')
    }
  },[status, history])

  const submitHandler = (event: any) => {
    event.preventDefault();

    console.log('emp department:',employee.department_id);
    
    let data = {
      name: employee.name,
      salary: employee.salary,
      department_id: employee.department_id,
    };

    dispatch(createEmployee(data));

    // history.push('/')
  };

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
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
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="department">Department</label>
           <select name="department" id="department"  value={employee.department_id} onChange={(e) => {
             setEmployee({ ...employee, department_id: e.target.value });
             console.log('department target value:', e.target.value);
            }
            }>
              <option value="1">PS</option>
              <option value="2">HR</option>
              <option value="3">ADMIN</option>
            </select>
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler} className="btn">
            Add Employee
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EmployeeForm;