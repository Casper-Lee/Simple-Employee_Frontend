import { useEffect, useState } from "react";
import { getAllEmployees } from "../../store/employeeSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import ReactPaginate from "react-paginate";
import classes from "./EmployeeList.module.css";

const EmployeeList = (props: any) => {
  const { employees } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(0);

  let EmployeePerPage = 10;
  const pagesVisted = pageNumber * EmployeePerPage;

  // console.log(employees);

  // if (Array.isArray(employees)) {
  //   console.log("Is an array");
  // } else {
  //   console.log("Is not an array");
  // }

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const displayEmployees = employees
    .slice(pagesVisted, pagesVisted + EmployeePerPage)
    .map((employee) => {
      return (
        <ul className={classes.employeeul}>
          <EmployeeCard
            key={employee.id}
            id={employee.id}
            name={employee.name}
            salary={employee.salary}
            department={employee.department}
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
          // disabledClassName={classes.paginationDisabled}
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
