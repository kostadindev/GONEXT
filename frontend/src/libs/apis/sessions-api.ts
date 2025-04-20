import { fetchData, postData, putData, deleteData } from "./reusable-api";

// Function to get all sessions
export const getAllSessions = async () => {
  return await fetchData('sessions');
};

// Function to get a session by ID
export const getSessionById = async (id: string) => {
  return await fetchData(`sessions/${id}`);
};

// Function to create a new session
export const createSession = async (sessionData: Record<string, any>) => {
  return await postData('sessions', sessionData);
};

// Function to update a session by ID
export const updateSession = async (id: string, sessionData: Record<string, any>) => {
  return await putData(`sessions/${id}`, sessionData);
};

// Function to delete a session by ID
export const deleteSession = async (id: string) => {
  return await deleteData(`sessions/${id}`);
};

// Function to add a message to a session
export const addMessageToSession = async (sessionId: string, messageData: Record<string, any>) => {
  return await postData(`sessions/${sessionId}/messages`, messageData);
};

// Function to update a message in a session
export const updateMessageInSession = async (sessionId: string, messageId: string, messageData: Record<string, any>) => {
  return await putData(`sessions/${sessionId}/messages/${messageId}`, messageData);
};

// Function to get a session by game ID
export const getSessionByGameId = async (gameId: number) => {
  return await fetchData(`sessions/game/${gameId}`);
};

// Function to clear all messages in a session
export const clearSessionMessages = async (sessionId: string) => {
  return await deleteData(`sessions/${sessionId}/messages`);
};
