import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { saveUserResultsToDB, fetchUserResultsFromDB, fetchUserFavouritesFromDB } from '../utils/apiFunctions';
import { Predictions, UserHistory, Neighbourhood } from '../utils/types';
import { useNavigate } from 'react-router-dom';

const useSetUserData = (
    isPageLoaded: boolean,
    setIsPageLoaded: React.Dispatch<React.SetStateAction<boolean>>, 
    setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>,
    setUserHistory: React.Dispatch<React.SetStateAction<UserHistory[] | null>>,
    neighbourhoods: Neighbourhood[],
    predictions: Predictions,
    selectedBoroughs: string[],
) => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const { isQuestionnaireCompleted } = useQuestionnaire();
    const navigate = useNavigate();

  useEffect(() => {
    const setUserData = async () => {
      if (!isPageLoaded && isLoaded && Object.keys(predictions).length > 0 && neighbourhoods.length > 0 && selectedBoroughs.length > 0 && neighbourhoods[0].rating > 0) {        
        try {
          // continue as guest
          if (!isSignedIn && isQuestionnaireCompleted()) {
            console.log("test: continue as guest");
            setIsPageLoaded(true);
          }
          
        // signed in and completed questionnaire
        if (isSignedIn && user && isQuestionnaireCompleted() && !isPageLoaded) {
            console.log("test: signed in and completed questionnaire");

            await saveUserResultsToDB(user.id, predictions, selectedBoroughs, neighbourhoods[0].name, neighbourhoods[0].rating)
            const dbResultsResponse = await fetchUserResultsFromDB(user.id);
            const dbFavouritesResponse = await fetchUserFavouritesFromDB(user.id, neighbourhoods)
            setUserHistory(dbResultsResponse.results);
            setUserFavourites(dbFavouritesResponse);
            setIsPageLoaded(true);
        }
        
        // signed in and questionnaire not completed
        if (isSignedIn && user && !isQuestionnaireCompleted()) {
            console.log("test: signed in and questionnaire not completed");
            const dbResultsResponse = await fetchUserResultsFromDB(user.id);
            const dbFavouritesResponse = await fetchUserFavouritesFromDB(user.id, neighbourhoods)
            
            // If user has no saved results in the database, redirect to welcome page
            if (dbResultsResponse.results.length === 0) {
              navigate("/welcome");
              throw new Error(`Couldn't find user results in database: ${user}`);
            }
            
            setUserHistory(dbResultsResponse.results);
            setUserFavourites(dbFavouritesResponse);
            setIsPageLoaded(true);
          }

      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    }
  }

    setUserData();
  }, [isLoaded, isSignedIn, user, neighbourhoods, predictions, selectedBoroughs]);

  return 
};

export default useSetUserData;
