import joblib
import pandas as pd

class PredictionService:
    def __init__(self):
        self.model = joblib.load("./models/Pickle_Rick.pkl")

    def predict_zipcode(self, data):
        print(self.model)
        # Convert data to dataframe
        df = pd.DataFrame([data])

        # Return the models predictions on the data
        return self.model.predict(df)
    
    def predict_proba(self, data):
        # Convert data to dataframe
        df = pd.DataFrame([data])
        
        # Get zipcodes mappings from csv
        zipcodes_df = pd.read_csv('./zipcodes.csv')

        # Get the probability distribution for the data
        prob_distribution = self.model.predict_proba(df)

        # Create a dataframe for the probability distribution
        prob_df = pd.DataFrame(prob_distribution[0], columns=['probability'])
        
        # Add the corresponding zipcodes to the dataframe
        prob_df['zipcode'] = zipcodes_df

        # Return a dictionary of key/value pairs where the key is the zipcode and the value is the probability
        return dict(zip(prob_df['zipcode'], prob_df['probability']))
