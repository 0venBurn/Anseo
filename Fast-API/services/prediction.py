import joblib
import pandas as pd
import numpy as np
import re
from scipy import stats

def get_age_category_index(age):
    age_categories = [
        "Under 5 years", "5 to 9 years", "10 to 14 years", "15 to 19 years",
        "20 to 24 years", "25 to 29 years", "30 to 34 years", "35 to 39 years",
        "40 to 44 years", "45 to 49 years", "50 to 54 years", "55 to 59 years",
        "60 to 64 years", "65 to 69 years", "70 to 74 years", "75 to 79 years",
        "80 to 84 years", "85 years and over"
    ]
    if isinstance(age, str):
        return age_categories.index(age)
    
    for i, category in enumerate(age_categories):
        if category.startswith("Under"):
            if age < 5:
                return i
        elif category.endswith("and over"):
            if age >= 85:
                return i
        else:
            parts = category.split()
            if len(parts) == 3:  # "X to Y years"
                start, end = map(int, parts[0].split('to'))
                if start <= age <= end:
                    return i
            elif len(parts) == 4:  # "X years and over"
                start = int(parts[0])
                if age >= start:
                    return i
    return -1  # Return -1 if no matching category is found   # Return last category for ages 85 and over

def get_income_category_index(income):
    income_cats = [
        'annual_individual_earnings_Data_< $10,000',
        'annual_individual_earnings_Data_$10,000-$19,999',
        'annual_individual_earnings_Data_$20,000-$29,999',
        'annual_individual_earnings_Data_$30,000-$39,999',
        'annual_individual_earnings_Data_$40,000-$49,999',
        'annual_individual_earnings_Data_$50,000-$64,999',
        'annual_individual_earnings_Data_$65,000-$74,999',
        'annual_individual_earnings_Data_$75,000-$99,999',
        'annual_individual_earnings_Data_$100,000+'
    ]
    if isinstance(income, str):
        return income_cats.index(income)
    
    for i, category in enumerate(income_cats):
        income_range = category.split('_')[-1]
        
        if income_range.startswith('<'):
            if income < int(income_range[1:].replace('$', '').replace(',', '')):
                return i
        elif income_range.endswith('+'):
            if income >= int(income_range[:-1].replace('$', '').replace(',', '')):
                return i
        else:
            low, high = map(lambda x: int(x.replace('$', '').replace(',', '')), income_range.split('-'))
            if low <= income < high:
                return i
    
    return -1 # Return last category if not found

def rent_range_matches(category, rent):
    category = category.replace(',', '')
    match = re.search(r'\$(\d+)-\$(\d+)', category)
    if match:
        low, high = int(match.group(1)), int(match.group(2))
        return low <= rent <= high
    match = re.search(r'< \$(\d+)', category)
    if match:
        return rent < int(match.group(1))
    match = re.search(r'\$([\d,]+)\+', category)
    if match:
        return rent >= int(match.group(1).replace(',', ''))
    return False

def question_to_inputs(request):
    question = request.data
    print(question)
    #gender
    gender_man= question.genderRatio
    gender_woman = 1-gender_man
    age_categories = [
        "Under 5 years", "5 to 9 years", "10 to 14 years", "15 to 19 years",
        "20 to 24 years", "25 to 29 years", "30 to 34 years", "35 to 39 years",
        "40 to 44 years", "45 to 49 years", "50 to 54 years", "55 to 59 years",
        "60 to 64 years", "65 to 69 years", "70 to 74 years", "75 to 79 years",
        "80 to 84 years", "85 years and over"
    ]
    age1 = question.selectedAgeGroup[0]
    age2 = question.selectedAgeGroup[1]
    index1 = get_age_category_index(age1)
    index2 = get_age_category_index(age2)
    
    # Calculate the mean of the two indices
    mean = (index1 + index2) / 2
    
    std_dev = .5
    skew = (index2 - index1) / 2  # Adjust skew based on the difference between ages
    sample_size = 10000
    # Generate skew normal distribution
    data = stats.skewnorm.rvs(a=skew, loc=mean, scale=std_dev, size=sample_size)
    
    # Clip the data to fit within the range of age categories
    data = np.clip(data, 0, len(age_categories) - 1)
    

    # Modelling desired age for the user input
    

    age = []
    hist, bin_edges = np.histogram(data, bins=len(age_categories), density=True)
    age_return_total = [x * question.ageImportance for x in hist.tolist()]
    age_inp = [x * gender_man for x in age_return_total]+[x * gender_woman for x in age_return_total]+age_return_total    # Business count
    
    
    
    if question.areaType == 'Residential':
        business_count = 0.25
    elif question.areaType == 'Business Oriented':
        business_count = 0.75
    else:
        business_count = 0.5
    opening_hour = question.openHour
    closing_hour = question.closeHour
    footfall = [0 for _ in range(24)]
    footfall[opening_hour:closing_hour] = [1 * question.footfallImportance] * (closing_hour - opening_hour)    # Competitiveness
    compete = question.surroundingBusinessesImportance    # Access to transport
    access_to_transport = question.proximityImportance    # Income categories
    income_cats = [
        'annual_individual_earnings_Data_< $10,000',
        'annual_individual_earnings_Data_$10,000-$19,999',
        'annual_individual_earnings_Data_$20,000-$29,999',
        'annual_individual_earnings_Data_$30,000-$39,999',
        'annual_individual_earnings_Data_$40,000-$49,999',
        'annual_individual_earnings_Data_$50,000-$64,999',
        'annual_individual_earnings_Data_$65,000-$74,999',
        'annual_individual_earnings_Data_$75,000-$99,999',
        'annual_individual_earnings_Data_$100,000+'
    ]
    sample_size = 10000  # Number of samples
    std_dev = 0.5

    income1 = question.selectedIncomeLevel[0]
    income2 = question.selectedIncomeLevel[1]
    # Get the indices of the categories for the two input incomes
    index1 = get_income_category_index(income1)
    index2 = get_income_category_index(income2)
    
    # Calculate the mean of the two indices
    mean = (index1 + index2) / 2
    
    # Set parameters for skew normal distribution
    std_dev = 1.0
    skew = (index2 - index1) / 2  # Adjust skew based on the difference between incomes
    
    # Generate skew normal distribution
    data = stats.skewnorm.rvs(a=skew, loc=mean, scale=std_dev, size=sample_size)
    
    # Clip the data to fit within the range of income categories
    data = np.clip(data, 0, len(income_cats) - 1)
    
    hist, bin_edges = np.histogram(data, bins=len(income_cats), density=True)
    income_return_total = [x * question.incomeImportance for x in hist.tolist()]
    income_inp = income_return_total  
    # Rent categories
    rent_categories = [
        'monthly_rent_including_utilities_studio_apt_Data_< $200',
        'monthly_rent_including_utilities_studio_apt_Data_$200-$299',
        'monthly_rent_including_utilities_studio_apt_Data_$300-$499',
        'monthly_rent_including_utilities_studio_apt_Data_$500-$749',
        'monthly_rent_including_utilities_studio_apt_Data_$750-$999',
        'monthly_rent_including_utilities_studio_apt_Data_$1,000+',
        'monthly_rent_including_utilities_1_b_Data_< $200',
        'monthly_rent_including_utilities_1_b_Data_$200-$299',
        'monthly_rent_including_utilities_1_b_Data_$300-$499',
        'monthly_rent_including_utilities_1_b_Data_$500-$749',
        'monthly_rent_including_utilities_1_b_Data_$750-$999',
        'monthly_rent_including_utilities_1_b_Data_$1,000+',
        'monthly_rent_including_utilities_2_b_Data_< $200',
        'monthly_rent_including_utilities_2_b_Data_$200-$299',
        'monthly_rent_including_utilities_2_b_Data_$300-$499',
        'monthly_rent_including_utilities_2_b_Data_$500-$749',
        'monthly_rent_including_utilities_2_b_Data_$750-$999',
        'monthly_rent_including_utilities_2_b_Data_$1,000+',
        'monthly_rent_including_utilities_3plus_b_Data_< $200',
        'monthly_rent_including_utilities_3plus_b_Data_$200-$299',
        'monthly_rent_including_utilities_3plus_b_Data_$300-$499',
        'monthly_rent_including_utilities_3plus_b_Data_$500-$749',
        'monthly_rent_including_utilities_3plus_b_Data_$750-$999',
        'monthly_rent_including_utilities_3plus_b_Data_$1,000+'
    ]
    input_rent = question.budget
    sparse_array = np.zeros(len(rent_categories))
    for i, category in enumerate(rent_categories):
        if rent_range_matches(category, input_rent):
            sparse_array[i] = 1    # Family structure
    family_single = [
        'families_vs_singles_Data_Husband Wife Family Households',
        'families_vs_singles_Data_Single Guardian',
        'families_vs_singles_Data_Singles',
        'families_vs_singles_Data_Singles With Roommate'
    ]
    fam_list = []
    if question.targetGroup == ['Families']:
        print('fam')
        fam_list = [1, 0.6, 0, 0]
    elif question.targetGroup == ['Singles']:
        print("sing")
        fam_list = [0, 0.4, 1, 1]
    else:
        fam_list = [.5,.5,.5,.5]

    industry_options = [
        'Industry_Amusement Arcade', 'Industry_Amusement Device Permanent',
        'Industry_Amusement Device Portable', 'Industry_Amusement Device Temporary',
        'Industry_Auction House Premises', 'Industry_Auctioneer',
        'Industry_Bingo Game Operator', 'Industry_Booting Company',
        'Industry_Cabaret', 'Industry_Car Wash', 'Industry_Catering Establishment',
        'Industry_Commercial Lessor', 'Industry_Construction Labor Provider',
        'Industry_Dealer In Products', 'Industry_Debt Collection Agency',
        'Industry_Electronic & Appliance Service', 'Industry_Electronic Cigarette Dealer',
        'Industry_Electronics Store', 'Industry_Employment Agency', 'Industry_Games of Chance',
        'Industry_Gaming Cafe', 'Industry_Garage', 'Industry_Garage and Parking Lot',
        'Industry_General Vendor', 'Industry_General Vendor Distributor',
        'Industry_Home Improvement Contractor', 'Industry_Home Improvement Salesperson',
        'Industry_Horse Drawn Cab Owner', 'Industry_Horse Drawn Driver', 'Industry_Laundries',
        'Industry_Laundry', 'Industry_Laundry Jobber', 'Industry_Locksmith',
        'Industry_Locksmith Apprentice', 'Industry_Motion Picture Projectionist',
        'Industry_Newsstand', 'Industry_Parking Lot', 'Industry_Pawnbroker',
        'Industry_Pedicab Business', 'Industry_Pedicab Driver', 'Industry_Pool or Billiard Room',
        'Industry_Process Server Individual', 'Industry_Process Serving Agency',
        'Industry_Scale Dealer Repairer', 'Industry_Scrap Metal Processor',
        'Industry_Secondhand Dealer - Auto', 'Industry_Secondhand Dealer - Firearms',
        'Industry_Secondhand Dealer - General', 'Industry_Sidewalk Cafe', 'Industry_Sightseeing Bus',
        'Industry_Sightseeing Guide', 'Industry_Special Sale', 'Industry_Stoop Line Stand',
        'Industry_Storage Warehouse', 'Industry_Third Party Food Delivery', 'Industry_Ticket Seller',
        'Industry_Ticket Seller Business', 'Industry_Tobacco Retail Dealer', 'Industry_Tow Truck Company',
        'Industry_Tow Truck Driver', 'Industry_Tow Truck Exemption'
    ]
    industry_sparse_array = np.zeros(len(industry_options))
    industry_input = question.businessType
    for i, industry in enumerate(industry_options):
        if industry == industry_input:
            industry_sparse_array[i] = 1
            break
    #Population density
    density = question.populationDensity
  
    #Employment
    if question.employmentStatus == "Full Time":
        emp = [1,0,0]
    elif question.employmentStatus == 'Part Time':
        emp = [0,1,0]
    else:
        emp = [0,0,1]    # Merge all the separate outputs into the input to model
    input_to_model = [
        compete,
        business_count,
          # lng (placeholder)
        density, # population_density (placeholder)
        .5,
         .5, # occupied_housing_units (placeholder)
          # median_home_value (placeholder)
        *age_inp,
        gender_man,
        gender_woman,
  # population_by_gender_Data_Female (placeholder)
        *fam_list,
        *sparse_array,
        *emp, # employment_status_Data_No Earnings (placeholder)
        *income_inp,
        access_to_transport,
        *footfall,        *[0]*62,  # arrest counts (placeholders)
        *industry_sparse_array
    ]
    print(1,1,1,1,1,len(age_inp),1,1,len(fam_list),len(sparse_array),len(emp),len(income_inp),1,len(footfall),len(industry_sparse_array))
    return input_to_model

class PredictionService:
    def __init__(self):
        self.model = joblib.load("./models/model.pkl")

    def predict(self, data):
        # Get zipcodes mappings from csv
        zipcodes_df = pd.read_csv('./zipcodes.csv')
        
        input_to_model = question_to_inputs(data)

        # Assuming clf is your classifier and it has been trained already
        # Reshape input_to_model to be 2D
        input_to_model_reshaped = np.array(input_to_model).reshape(1, -1)

        # Predict using the model
        prediction = self.model.predict_log_proba(input_to_model_reshaped)

        # Create a dataframe for the probability distribution
        prediction_df = pd.DataFrame(prediction[0], columns=['probability'])
        
        # Add the corresponding zipcodes to the dataframe
        prediction_df['zipcode'] = zipcodes_df

        # Return a dictionary of key/value pairs where the key is the zipcode and the value is the probability
        return dict(zip(prediction_df['zipcode'], prediction_df['probability']))

    


