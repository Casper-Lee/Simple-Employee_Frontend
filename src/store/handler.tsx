import axios from "axios";
interface AxiosError {
  message: string;
  response: {
    status: number;
    statusText: string;
    data?: { errorMessage: string };
  };
}

export const setToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};
export const getToken = (): string | null => {
  const tokenString = localStorage.getItem("token");
  console.log('Tokenstring: ',tokenString)
  return tokenString ? JSON.parse(tokenString) : null;
};
export const removeToken = () => {
  localStorage.removeItem("token");
};
export const setAuthorizationToken = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};
export const removeAuthorizationToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};