import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { saveUserResultsToDB, fetchUserResultsFromDB, fetchUserFavouritesFromDB } from '../utils/apiFunctions';
import { Predictions, UserHistory, Neighbourhood } from '../utils/types';
import { useNavigate } from 'react-router-dom';

const useSetUserData = (
    setIsPageLoaded: React.Dispatch<React.SetStateAction<boolean>>, 
    setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>,
    setUserHistory: React.Dispatch<React.SetStateAction<UserHistory[] | null>>,
    neighbourhoods: Neighbourhood[],
    predictions: Predictions,
    selectedBoroughs: string[],
) => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const { isQuestionnaireCompleted, setQuestionnaireDefault } = useQuestionnaire();
    const navigate = useNavigate();

  useEffect(() => {
    const setUserData = async () => {
      console.log(isLoaded, !!predictions, neighbourhoods.length > 0, selectedBoroughs.length > 0)
      console.log(isLoaded, predictions, neighbourhoods, selectedBoroughs)
      if (isLoaded && predictions && neighbourhoods.length > 0 && selectedBoroughs.length > 0) {        
        try {
          // continue as guest
          if (!isSignedIn && isQuestionnaireCompleted()) {
            console.log("test: continue as guest");
            setQuestionnaireDefault()
          }
          
        // signed in and completed questionnaire
        if (isSignedIn && user && isQuestionnaireCompleted()) {
            console.log("test: signed in and completed questionnaire");
            console.log(neighbourhoods)
            console.log(neighbourhoods[0])
            console.log(neighbourhoods[0].name)
            console.log(neighbourhoods[0].rating)
            console.log(user.id)

            await saveUserResultsToDB(user.id, predictions, selectedBoroughs, neighbourhoods[0].name, neighbourhoods[0].rating)
            const dbResultsResponse = await fetchUserResultsFromDB(user.id);
            const dbFavouritesResponse = await fetchUserFavouritesFromDB(user.id, neighbourhoods)
            console.log(dbResultsResponse);
            console.log(dbFavouritesResponse);
            setUserHistory(dbResultsResponse.results);
            setUserFavourites(dbFavouritesResponse);
            setQuestionnaireDefault()
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
