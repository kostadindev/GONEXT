import axios from "axios";
import { Game } from "./league-types";


export const getActiveGame = async (): Promise<Game | null> => {
  try {
    const response = await axios.get('http://localhost:8000/api/active-game');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the active game:', error);
    return null;
  }
}