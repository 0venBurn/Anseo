import { Payload } from "../utils/types";

const fastURL = import.meta.env.VITE_FAST_URL;
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Function to handle ML API request
export const fetchMLPredictions = async (results: Payload) => {
  const response = await fetch(`${fastURL}/api/v1/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(results),
  });
  if (!response.ok) throw new Error("API response from ML Model was not ok.");
  return response.json();
};

export const saveUserResultsToDB = async (clerkUserId: string, results: Payload) => {
  const response = await fetch(`${backendURL}/api/v1/user-results/${clerkUserId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkUserId, results }),
  });
  if (!response.ok) throw new Error("API response from DB was not ok.");
};

export const fetchUserResultsFromDB = async (clerkUserId: string) => {
  const response = await fetch(`${backendURL}/api/v1/user-results/${clerkUserId}`);
  if (!response.ok) throw new Error("API response from DB was not ok.");
  return response.json();
};

export const fetchUserFavouritesFromDB = async (clerkUserId: string) => {
  const allNeighbourhoods = await fetch(`${backendURL}/api/v1/neighbourhoods`);
  const userFavourites = await fetch(`${backendURL}/api/v1/user-favourites/${clerkUserId}`);
  const favouriteNeighbourhoods = userFavourites.json();

};

export const saveUserFavouriteToDB = async (clerkUserId: string, neighbourhoodId: number) => {
  const response = await fetch(`${backendURL}/api/v1/user-favourites/${clerkUserId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkUserId, neighbourhoodId }),
  });
  if (!response.ok) throw new Error("API response from DB was not ok.");
};

export const deleteUserFavouriteFromDB = async (clerkUserId: string, neighbourhoodId: number) => {
  await fetch(`${backendURL}/api/v1/user-favourites/${clerkUserId}/${neighbourhoodId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchAllPages = async (table: string) => {
  const fetchPage = async (table:string, page: number) => {
    try {
      const response = await fetch(
      `${backendURL}/api/v1/${table}?page=${page}`,
      );

      if (!response.ok) throw new Error(`Couldn't fetch from ${table}`);
      const data = await response.json();
      return data._embedded[`${table}`];
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      return [];
    }
  };
  try {
    const response = await fetch(`${backendURL}/api/v1/${table}`);
    const data = await response.json()

    const totalPages = data.page.totalPages;
    if (!response.ok) throw new Error(`Couldn't fetch from ${table}`);

    // Fetch all pages concurrently
    const allPagesPromises = [];
    for (let page = 0; page < totalPages; page++) {
      allPagesPromises.push(fetchPage(table, page));
    }

    const allPages= await Promise.all(allPagesPromises);

    return allPages;
  } catch (error) {
    console.error(`Error fetching page:`, error);
    return [];
  }
};







