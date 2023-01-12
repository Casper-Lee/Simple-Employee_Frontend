import { useState } from "react";
import { useHistory } from "react-router";
import { createEmployee } from "../../store/employeeSlice";
import { useAppDispatch } from "../../store/store";

import Card from "../Card/Card";
import classes from "./EmployeeForm.module.css";

const EmployeeForm: React.FC = (props: any, {employees, count, page, onChange, itemsPerPage = 10}) => {
  const dispatch = useAppDispatch();
  const history = useHistory()

  const [employee, setEmployee] = useState({
    name: "",
    salary: 0,
    // department: ['HR', 'PS']
    department: "HR",
  });

  console.log('haha');

  const submitHandler = (event: any) => {
    event.preventDefault();

    console.log('emp departmentt:',employee.department);
    

    let data = {
      name: employee.name,
      salary: employee.salary,
      department: employee.department,
    };

    dispatch(createEmployee(data));

    history.push('/')
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
           <select name="department" id="department"  value={employee.department} onChange={(e) => {
             setEmployee({ ...employee, department: e.target.value });
             console.log('department target value:', e.target.value);
            }
            }>
              <option value="HR">HR</option>
              <option value="PS">PS</option>
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
