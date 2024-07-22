import { Payload } from "../utils/types";

const fastURL = import.meta.env.VITE_FAST_URL;
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Function to handle ML API request
export const fetchMLPredictions = async (payload: Payload) => {
  const response = await fetch(`${fastURL}/api/v1/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("API response from ML Model was not ok.");
  return response.json();
};

export const saveUserResultsToDB = async (userId: string, payload: Payload) => {
  const response = await fetch(`${backendURL}/api/v1/user-results/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkUserId: userId, results: payload }),
  });
  if (!response.ok) throw new Error("API response from DB was not ok.");
};

export const fetchUserResultsFromDB = async (userId: string) => {
  const response = await fetch(`${backendURL}/api/v1/user-results/${userId}`);
  return response.json();
};





