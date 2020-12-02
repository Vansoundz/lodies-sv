import { api } from "../api/auth.api";

const getUser = async () => {
  try {
    let resp = (await api.getUser()).data;
    return resp;
  } catch (error) {
    return {};
  }
};

const login = async (user: { email: string; password: string }) => {
  try {
    let resp = (await api.login(user)).data;
    return resp;
  } catch (error) {
    return {};
  }
};

const register = async (user: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    let resp = (await api.register(user)).data;
    return resp;
  } catch (error) {
    return {};
  }
};

const logout = async () => {
  try {
    let resp = (await api.logout()).data;
    return resp;
  } catch (error) {
    return {};
  }
};

export { getUser, login, register, logout };
