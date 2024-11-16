import { User, UserResponse } from '../interface/UserInterface';
import api from './api';

const fetchUserData = async (username?: string): Promise<User> => {
  if (!username) {
    throw new Error('username não foi encontrado');
  }
  const response = await api.get<User>(`/public/users/user/${username}`);

  return response.data;
};
const fetchUsersList = async (
  page: number,
  limit: number
): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/public/users/`, {
    params: { page, limit },
  });

  return response.data;
};

export { fetchUserData, fetchUsersList };
