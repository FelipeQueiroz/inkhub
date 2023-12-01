import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = "https://inkhub-api-production.up.railway.app";

export interface User {
  email: string;
  googleId: string;
  imageUrl: string;
  name: string;
  portifolioUrl: string;
  id?: number;
}

export const getUserVerification = async (googleId: string | null) => {
  const { data } = await axios.get(`${API_URL}/user/exists/${googleId}`);
  return data;
};

const useGetUserVerification = (googleId: string | null) =>
  useQuery<User | false>({
    queryKey: ["verifyUser"],
    queryFn: () => getUserVerification(googleId),
    enabled: false,
  });

export const createUser = async (user: User | undefined) => {
  if (!user) return;
  const { data } = await axios.post(`${API_URL}/users`, { user });
  return data;
};

const useCreateUser = (user: User | undefined) =>
  useMutation<User>({ mutationFn: () => createUser(user) });

export { useCreateUser, useGetUserVerification };
