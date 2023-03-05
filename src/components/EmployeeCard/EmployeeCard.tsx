import classes from "./EmployeeCard.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { deleteEmployee, getEmployeeById } from "../../store/employeeSlice";
import { useEffect, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface IEmp {
  key: number;
  id: number;
  name: string;
  salary: number;
  department: string;
}

const EmployeeCard: React.FC<IEmp> = ({key, id, name, salary, department}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // const params: {
  //   employeeId: string;
  // } = useParams();

  // console.log("Params emp.id", params.employeeId;

  useEffect(() => {
    // if(!params.employeeId) return;
    dispatch(getEmployeeById(id));
  }, [dispatch, id]);

  // console.log('props', props);
  // console.log('employee', employee);

  const deleteEmployeeHandler = () => {
    // if (!params.employeeId) return;
    dispatch(deleteEmployee(id));
    console.log("Deleted!");
    // console.log('props.id:', props.id)
    history.push("/");
  };

  return (
    <li className={classes.item} >
      <div className={classes.row}>
        <div className={classes.column}>
          <p className={classes.name}>{name}</p>
          <p>{department}</p>
          <p>${salary}</p>
        </div>
        <div className={classes.icons}>
          <Link to={`/employee/${id}`}>
            <EditIcon className={classes.editicon} />
          </Link>
          <DeleteIcon className={classes.deleteicon} onClick={openModal}  />
          <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2>Are you sure to delete employee</h2>
            <CloseIcon onClick={closeModal} />
            {/* <button onClick={closeModal}>close</button> */}
            <button
              className={classes.deleteiconbutton}
              onClick={deleteEmployeeHandler}
            >
              <DeleteIcon className={classes.deleteicon} />
            </button>
          </Modal>
        </div>
      </div>
    </li>
  );
};

export default EmployeeCard;
