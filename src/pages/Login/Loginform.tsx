import axios from "axios";
// import { AxiosError } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card/Card";
import { setAuthorizationToken, setToken } from "../../store/handler";
import classes from "./Loginform.module.css";

// interface Credentials {
//   username: string;
//   password: string;
// }

// interface AuthResponse {
//   token: string;
// }

interface LoginResponse {
  token: string;
}

interface HistoryProps {
  push: (path: string) => void;
}

// const api = axios.create({
//   baseURL: "http://localhost:3000/auth/login",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory<HistoryProps>();

  // const [credentials, setCredentials] = useState<Credentials>({
  //   username: "",
  //   password: "",
  // });
  const [error, setError] = useState<string>("");

  // handle input changes
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setCredentials({ ...credentials, [name]: value });
  // };

  // handle form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', { username, password });
      const token = `Bearer ${response.data.token}`;
      setToken(token)
      setAuthorizationToken()
      // localStorage.setItem('token', token);
      console.log('Response:', response)
      console.log('Token:', token)
      // const response = await api.post<AuthResponse>("/", credentials);
      // const { token } = response.data;
      // localStorage.setItem("token", token);
      // console.log('Axios', axios.defaults.headers.common['Authorization'])
      // console.log("token: ", token);
      // console.log("header: ", api.defaults.headers)
      // console.log('API', api)
      history.push("/employee");
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        history.push("/login");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className={classes.logincontainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
      <h1>
        LOGIN
      </h1>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            // value={credentials.username}
            // onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            // value={credentials.password}
            // onChange={handleInputChange}
          />
        </label>
        <button type="submit" className={classes.loginbutton}>Login</button>
        {error && <p>{error}</p>}
        <a href="/signup">Don't have an account, Sign up here</a>
      </form>
    </div>
  );
};

export default LoginForm;
