import { useEffect, useState } from "react";
import { getAllEmployees } from "../../store/employeeSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import ReactPaginate from "react-paginate";
import classes from "./EmployeeList.module.css";
import { useAuth } from "../../store/authContext";
import { getToken } from "../../store/handler";



 

const EmployeeList:React.FC = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const employeesDepartment = {
    "1" : "PS",
    "2" : "HR",
    "3" : "ADMIN"
  }

  const checkAuthenticated = () => {
    const token = getToken()

    if(token){
      setAuthenticated(true)
    }else{
      setAuthenticated(false)
    }
  }

  const { employees }: any = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(0);

  let EmployeePerPage = 10;
  const pagesVisted = pageNumber * EmployeePerPage;

  console.log('Employees:',employees);

  // if (Array.isArray(employees)) {
  //   console.log("Is an array");
  // } else {
  //   console.log("Is not an array");
  // }

  useEffect(() => {
    checkAuthenticated()
    dispatch(getAllEmployees());
  }, [dispatch]);

  const displayEmployees = employees
    .slice(pagesVisted, pagesVisted + EmployeePerPage)
    .map((employee: { id: number; name: string; salary: number; department_id: number; }) => {
      return (
        <ul className={classes.employeeul}>
          <EmployeeCard
            key={employee.id}
            id={employee.id}
            name={employee.name}
            salary={employee.salary}
            department={ employeesDepartment[(employee.department_id.toString() as "1" | "2" | "3")]}
          />
        </ul>
      );
    });

  const pageCount = Math.ceil(employees.length / EmployeePerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className={classes.list}>{displayEmployees}</div>
      <div  className={classes.App}>
        <ReactPaginate
        className={classes.pagnationButtons}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={classes.paginationButtons}
          previousLinkClassName={classes.previousBtn}
          nextLinkClassName={classes.nextBttn}
          disabledClassName={classes.paginationDisabled}
          activeClassName={classes.paginationActive}
        />
      </div>
    </div>
  );
  // return (
  //   <Fragment>
  //     <ul className={classes.list}>
  //       {/* props.employee.map((employee: any))=>( */}
  //       {employees.slice(0,PageNumber).map((employee) => (
  //         <EmployeeCard
  //           key={employee.id}
  //           id={employee.id}
  //           name={employee.name}
  //           salary={employee.salary}
  //           department={employee.department}
  //         />
  //       ))}
  //     </ul>
  //     {/* <Pagination /> */}
  //   </Fragment>
  // );
};

export default EmployeeList;
