export const API = "http://localhost:3000/admin";
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // if you store user data
};
