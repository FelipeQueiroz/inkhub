import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Studio {
  blockedDates: BlockedDate[];
  cep: string;
  comments: Comment[];
  description: string;
  email: string;
  googleId: string;
  id: number;
  imageUrl: string;
  location: string;
  name: string;
  schedules: Schedule[];
  status: string;
}

export interface BlockedDate {
  dtEndBlock: string;
  dtStartBlock: string;
  id: number;
}

export interface Comment {
  commentDate: string;
  content: string;
  id: number;
}

export interface Schedule {
  date: string;
  dtEndSchedule: string;
  dtStartSchedule: string;
  id: number;
}

const API_URL = "https://inkhub-api-production.up.railway.app";

const getStudios = async () => {
  const { data } = await axios.get(`${API_URL}/studios`);
  return data;
};

const useGetStudios = () =>
  useQuery<Studio[]>({ queryKey: ["studios"], queryFn: getStudios });

const getStudio = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/studios/${id}`);
  return data;
};

const useGetStudio = (id: number) =>
  useQuery<Studio>({ queryKey: ["studio"], queryFn: () => getStudio(id) });

export { useGetStudios, useGetStudio };
