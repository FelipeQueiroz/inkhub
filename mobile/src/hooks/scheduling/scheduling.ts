import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Scheduling {
  date: string;
  dtEndSchedule: string;
  dtStartSchedule: string;
  id: number;
  studio: Studio;
  user: User;
}

export interface Studio {
  cep: string;
  description: string;
  email: string;
  googleId: string;
  id: number;
  imageUrl: string;
  location: string;
  name: string;
  status: string;
}

export interface User {
  email: string;
  googleId: string;
  id: number;
  imageUrl: string;
  name: string;
  portifolioUrl: string;
}

const API_URL = "https://inkhub-api-production.up.railway.app";

const getSchedulings = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/scheduling/user/${id}`);
  return data;
};

const useGetSchedulings = (id: number) =>
  useQuery<Scheduling[]>({
    queryKey: ["schedulings"],
    queryFn: () => getSchedulings(id),
  });

export default useGetSchedulings;
