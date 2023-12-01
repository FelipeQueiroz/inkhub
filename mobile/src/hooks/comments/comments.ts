import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://inkhub-api-production.up.railway.app";

export interface Comment {
  commentDate: string;
  content: string;
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

const getComments = async (idStudio: number) => {
  const { data } = await axios.get(`${API_URL}/comments/${idStudio}`);
  return data;
};

const useGetComments = (idStudio: number) =>
  useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: () => getComments(idStudio),
  });

export default useGetComments;
