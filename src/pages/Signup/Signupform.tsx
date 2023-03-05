import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createUser } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from 'react-toastify';

import Card from "../../components/Card/Card";
import classes from "./Signupform.module.css";

const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory()
  const {status}: any  = useAppSelector((state) => state.user)
  const {errMsg}: any = useAppSelector((state) => state.user)
  const notify = (msg: string) => toast(msg)

  // console.log('Error Message:',errMsg)

  const [user, setUser] = useState({
    username: "",
    password: "",
    // department: ['HR', 'PS']
    department_id: "1",
  });

  // useEffect(() => {
  //   if(status === 'rejected'){
  //     console.log('User Rejected:', status)
  //     console.log(errMsg.response.data)
  //     notify(errMsg.response.data.message)
  //     notify('Cannot User Employee')
  //   }else if(status === 'fulfilled') {
  //     console.log('Employee updated:', status)
  //     notify('User created!')
  //     history.push('/login')
  //   }
  // },[status, history])

  const submitHandler = (event: any) => {
    event.preventDefault();

    console.log('emp department:',user.department_id);
    
    let data = {
      username: user.username,
      password: user.password,
      department_id: user.department_id,
    };

    dispatch(createUser(data));

    history.push('/login')
  };

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            type="text"
            id="username"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setUser({ ...user, password: String(e.target.value) })
            }
            value={user.password}
            id="password"
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="department">Department</label>
           <select name="department" id="department"  value={user.department_id} onChange={(e) => {
             setUser({ ...user, department_id: e.target.value });
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
            Create User
          </button>
        </div>
      </form>
    </Card>
  );
};

export default SignupForm;