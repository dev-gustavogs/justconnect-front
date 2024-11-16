import { UserForgotPassword, UserResetPassword, UserSignIn, UserSingUp } from '../interface/UserInterface';
import api from '../service/api';

const signUp = async (data: UserSingUp) => {
  const response = await api.post(`/public/users/register`, data);
  return response;
};

const signIn = async (data: UserSignIn) => {
  const response = await api.post(`/public/auth`, data);
  return response;
};

const forgotPassword = async (data: UserForgotPassword) => {
  const response = await api.post(`public/auth/forgot-password`, data);
  return response;
};
const resetPassword = async (data: UserResetPassword) => {
  const response = await api.post(`public/auth/reset-password`, data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return response;
};
export { signUp, signIn, forgotPassword,resetPassword };
