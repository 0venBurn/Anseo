import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { fetchMLPredictions, saveUserResultsToDB, fetchUserResultsFromDB } from '../utils/apiFunctions';
import { PredictionResponse, UserResult } from '../utils/types';
import { useNavigate } from 'react-router-dom';

const usePredictions = (
    setPredictions: React.Dispatch<React.SetStateAction<PredictionResponse>>,
    setIsPageLoaded: React.Dispatch<React.SetStateAction<boolean>>, 
    setSelectedBoroughs: React.Dispatch<React.SetStateAction<string[]>>, 
    setUserHistory: React.Dispatch<React.SetStateAction<UserResult[] | null>>
) => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const { data, isQuestionnaireCompleted, setQuestionnaireDefault } = useQuestionnaire();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!isLoaded) return;

      console.log("Clerk has finished loading");
      setIsPageLoaded(true);
      console.log(isSignedIn);

      try {
        // continue as guest
        if (!isSignedIn && isQuestionnaireCompleted()) {
            console.log("test: continue as guest");
            const payload = { data };
            const predictions = await fetchMLPredictions(payload);
            setPredictions(predictions);
            setSelectedBoroughs(data.selectedBoroughs);
            setQuestionnaireDefault();
            return;
        }
        
        // signed in and completed questionnaire
        if (isSignedIn && user && isQuestionnaireCompleted()) {
            console.log("test: signed in and completed questionnaire");
            const payload = { data };
            const predictions = await fetchMLPredictions(payload)
            await saveUserResultsToDB(user.id, payload)
            const dbResponse = await fetchUserResultsFromDB(user.id);
            console.log(dbResponse);
            setUserHistory(dbResponse.results);
            setPredictions(predictions);
            setSelectedBoroughs(data.selectedBoroughs);
            setQuestionnaireDefault();
            return;
        }
        
        // signed in and questionnaire not completed
        if (isSignedIn && user && !isQuestionnaireCompleted()) {
            console.log("test: signed in and questionnaire not completed");
            const data = await fetchUserResultsFromDB(user.id);
            console.log(data)
            console.log(data.results)
            
            // If user has no saved results in the database, redirect to welcome page
            if (data.results.length === 0) {
              navigate("/welcome");
              throw new Error(`Couldn't find user results in database: ${user}`);
            }
            
            setUserHistory(data.results);
            const predictions = await fetchMLPredictions(data.results[0].results);
            console.log(predictions);
            setPredictions(predictions);
            setSelectedBoroughs(data.results[0].results.data.selectedBoroughs);
            return;
          }

          // not signed in and questionnaire not completed
        if (!isSignedIn && !isQuestionnaireCompleted()) {
            console.log("test: not signed in and questionnaire not completed");
            navigate("/welcome");
          }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchPredictions();
  }, [isLoaded, isSignedIn, user]);

  return 
};

export default usePredictions;
