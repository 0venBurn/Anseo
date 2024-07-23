import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { saveUserResultsToDB, fetchUserResultsFromDB, fetchUserFavouritesFromDB } from '../utils/apiFunctions';
import { PredictionResponse, UserResult, Neighbourhood } from '../utils/types';
import { useNavigate } from 'react-router-dom';

const useSetUserData = (
    setIsPageLoaded: React.Dispatch<React.SetStateAction<boolean>>, 
    setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>,
    setUserHistory: React.Dispatch<React.SetStateAction<UserResult[] | null>>,
    neighbourhoods: Neighbourhood[],
    predictions: PredictionResponse,
    selectedBoroughs: string[],
) => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const { isQuestionnaireCompleted } = useQuestionnaire();
    const navigate = useNavigate();

  useEffect(() => {
    const setUserData = async () => {
      if (isLoaded && predictions && neighbourhoods && selectedBoroughs) {        
        try {
          // continue as guest
          if (!isSignedIn && isQuestionnaireCompleted()) {
            console.log("test: continue as guest");
          }
          
        // signed in and completed questionnaire
        if (isSignedIn && user && isQuestionnaireCompleted()) {
            console.log("test: signed in and completed questionnaire");

            // await saveUserResultsToDB(user.id, predictions, selectedBoroughs, neighbourhoods[0].name, neighbourhoods[0].rating)
            const dbResultsResponse = await fetchUserResultsFromDB(user.id);
            const dbFavouritesResponse = await fetchUserFavouritesFromDB(user.id, neighbourhoods)
            console.log(dbResultsResponse);
            console.log(dbFavouritesResponse);
            setUserHistory(dbResultsResponse.results);
            setUserFavourites(dbFavouritesResponse);
        }
        
        // signed in and questionnaire not completed
        if (isSignedIn && user && !isQuestionnaireCompleted()) {
            console.log("test: signed in and questionnaire not completed");
            const dbResultsResponse = await fetchUserResultsFromDB(user.id);
            const dbFavouritesResponse = await fetchUserFavouritesFromDB(user.id, neighbourhoods)
            console.log(dbResultsResponse)
            console.log(dbFavouritesResponse)
            
            // If user has no saved results in the database, redirect to welcome page
            if (dbResultsResponse.results.length === 0) {
              navigate("/welcome");
              throw new Error(`Couldn't find user results in database: ${user}`);
            }
            
            setUserHistory(dbResultsResponse.results);
            setUserFavourites(dbFavouritesResponse);
          }

          // not signed in and questionnaire not completed
          if (!isSignedIn && !isQuestionnaireCompleted()) {
            console.log("test: not signed in and questionnaire not completed");
            navigate("/welcome");
          }

          setIsPageLoaded(true);

      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    }
  }

    setUserData();
  }, [isLoaded, isSignedIn, user, neighbourhoods, predictions]);

  return 
};

export default useSetUserData;
