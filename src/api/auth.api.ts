import Axios from "axios";

export const api = {
  getUser() {
    return Axios.get(`/api/users`);
  },
  register(user: { email: string; password: string; username: string }) {
    return Axios.post(`/api/users/register`, { ...user });
  },
  login(user: { password: string; email: string }) {
    return Axios.post(`/api/users/login`, { ...user });
  },
  logout() {
    return Axios.get(`/api/users/logout`);
  },
};
