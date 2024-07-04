import joblib
import pandas as pd
import numpy as np
import re

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

def question_to_inputs(question):

    #gender
    gender_man= question[-6]
    gender_woman = 1-gender_man

    # Modelling desired age for the user input
    age_categories = [
        "Under 5 years", "5 to 9 years", "10 to 14 years", "15 to 19 years",
        "20 to 24 years", "25 to 29 years", "30 to 34 years", "35 to 39 years",
        "40 to 44 years", "45 to 49 years", "50 to 54 years", "55 to 59 years",
        "60 to 64 years", "65 to 69 years", "70 to 74 years", "75 to 79 years",
        "80 to 84 years", "85 years and over"
    ]

    peak = age_categories.index(question[4])
    sample_size = 10000  # Number of samples
    std_dev = 0.5
    data = np.random.normal(loc=peak, scale=std_dev, size=sample_size)
    hist, bin_edges = np.histogram(data, bins=len(age_categories), density=True)
    age_return_total = [x * question[5] for x in hist.tolist()]
    age_inp = [x * gender_man for x in age_return_total]+[x * gender_woman for x in age_return_total]+age_return_total
    
    # Business count
    if question[-1] == 'Residential':
        business_count = 0.25
    else:
        business_count = 0.75
    
    # Footfall
    opening_hour = question[1]
    closing_hour = question[2]
    footfall = [0 for _ in range(24)]
    footfall[opening_hour:closing_hour] = [1 * question[10]] * (closing_hour - opening_hour)
    
    # Competitiveness
    compete = question[10]
    
    # Access to transport
    access_to_transport = question[9]
    
    # Income categories
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
    data = np.random.normal(loc=4, scale=std_dev, size=sample_size)  # Replace '4' with your specific peak or mean index
    hist, bin_edges = np.histogram(data, bins=len(income_cats), density=True)
    income_return_total = [x * question[7] for x in hist.tolist()]
    income_inp = income_return_total  # Adjust as per your specific logic
   
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
   
    input_rent = question[12]
    sparse_array = np.zeros(len(rent_categories))
    for i, category in enumerate(rent_categories):
        if rent_range_matches(category, input_rent):
            sparse_array[i] = 1
   
    # Family structure
    family_single = [
        'families_vs_singles_Data_Husband Wife Family Households',
        'families_vs_singles_Data_Single Guardian',
        'families_vs_singles_Data_Singles',
        'families_vs_singles_Data_Singles With Roommate'
    ]
   
    if question[8] == 'Families':
        fam_list = [1, 0.6, 0, 0]
    elif question[8] == 'Singles':
        fam_list = [0, 0.4, 1, 1]
   
    # Industry mapping
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
    industry_input = question[0]
    for i, industry in enumerate(industry_options):
        if industry == industry_input:
            industry_sparse_array[i] = 1
            break
   
    #Population density
    density = question[-3]
   
    #Home Value
    value = question[-4]/10000
   
    #Employment
    if question[-5] == "Full Time":
        emp = [1,0,0]
    elif question[-5] == 'Part Time':
        emp = [0,1,0]
    else:
        emp = [0,0,1]
    
    # Merge all the separate outputs into the input to model
    input_to_model = [
        compete,
        business_count,
          # lng (placeholder)
        density, # population_density (placeholder)
        .5,
         .5, # occupied_housing_units (placeholder)
        value,  # median_home_value (placeholder)
        *age_inp,
        gender_man,
        gender_woman,
        # population_by_gender_Data_Female (placeholder)
        *fam_list,
        *sparse_array,
        *emp, # employment_status_Data_No Earnings (placeholder)
        *income_inp,
        access_to_transport,
        *footfall,
        *[0]*62,  # arrest counts (placeholders)
        *industry_sparse_array
    ]
    
    return input_to_model

column_names = [
    "competitiveness count",
    "business count",
    "population_density",
    "housing_units",
    "occupied_housing_units",
    "median_home_value",
    "population_by_age_Male_0",
    "population_by_age_Male_1",
    "population_by_age_Male_2",
    "population_by_age_Male_3",
    "population_by_age_Male_4",
    "population_by_age_Male_5",
    "population_by_age_Male_6",
    "population_by_age_Male_7",
    "population_by_age_Male_8",
    "population_by_age_Male_9",
    "population_by_age_Male_10",
    "population_by_age_Male_11",
    "population_by_age_Male_12",
    "population_by_age_Male_13",
    "population_by_age_Male_14",
    "population_by_age_Male_15",
    "population_by_age_Male_16",
    "population_by_age_Male_17",
    "population_by_age_Female_0",
    "population_by_age_Female_1",
    "population_by_age_Female_2",
    "population_by_age_Female_3",
    "population_by_age_Female_4",
    "population_by_age_Female_5",
    "population_by_age_Female_6",
    "population_by_age_Female_7",
    "population_by_age_Female_8",
    "population_by_age_Female_9",
    "population_by_age_Female_10",
    "population_by_age_Female_11",
    "population_by_age_Female_12",
    "population_by_age_Female_13",
    "population_by_age_Female_14",
    "population_by_age_Female_15",
    "population_by_age_Female_16",
    "population_by_age_Female_17",
    "population_by_age_Total_0",
    "population_by_age_Total_1",
    "population_by_age_Total_2",
    "population_by_age_Total_3",
    "population_by_age_Total_4",
    "population_by_age_Total_5",
    "population_by_age_Total_6",
    "population_by_age_Total_7",
    "population_by_age_Total_8",
    "population_by_age_Total_9",
    "population_by_age_Total_10",
    "population_by_age_Total_11",
    "population_by_age_Total_12",
    "population_by_age_Total_13",
    "population_by_age_Total_14",
    "population_by_age_Total_15",
    "population_by_age_Total_16",
    "population_by_age_Total_17",
    "population_by_gender_Data_Male",
    "population_by_gender_Data_Female",
    "families_vs_singles_Data_Husband Wife Family Households",
    "families_vs_singles_Data_Single Guardian",
    "families_vs_singles_Data_Singles",
    "families_vs_singles_Data_Singles With Roommate",
    "monthly_rent_including_utilities_studio_apt_Data_< $200",
    "monthly_rent_including_utilities_studio_apt_Data_$200-$299",
    "monthly_rent_including_utilities_studio_apt_Data_$300-$499",
    "monthly_rent_including_utilities_studio_apt_Data_$500-$749",
    "monthly_rent_including_utilities_studio_apt_Data_$750-$999",
    "monthly_rent_including_utilities_studio_apt_Data_$1,000+",
    "monthly_rent_including_utilities_1_b_Data_< $200",
    "monthly_rent_including_utilities_1_b_Data_$200-$299",
    "monthly_rent_including_utilities_1_b_Data_$300-$499",
    "monthly_rent_including_utilities_1_b_Data_$500-$749",
    "monthly_rent_including_utilities_1_b_Data_$750-$999",
    "monthly_rent_including_utilities_1_b_Data_$1,000+",
    "monthly_rent_including_utilities_2_b_Data_< $200",
    "monthly_rent_including_utilities_2_b_Data_$200-$299",
    "monthly_rent_including_utilities_2_b_Data_$300-$499",
    "monthly_rent_including_utilities_2_b_Data_$500-$749",
    "monthly_rent_including_utilities_2_b_Data_$750-$999",
    "monthly_rent_including_utilities_2_b_Data_$1,000+",
    "monthly_rent_including_utilities_3plus_b_Data_< $200",
    "monthly_rent_including_utilities_3plus_b_Data_$200-$299",
    "monthly_rent_including_utilities_3plus_b_Data_$300-$499",
    "monthly_rent_including_utilities_3plus_b_Data_$500-$749",
    "monthly_rent_including_utilities_3plus_b_Data_$750-$999",
    "monthly_rent_including_utilities_3plus_b_Data_$1,000+",
    "employment_status_Data_Worked Full-time With Earnings",
    "employment_status_Data_Worked Part-time With Earnings",
    "employment_status_Data_No Earnings",
    "annual_individual_earnings_Data_< $10,000",
    "annual_individual_earnings_Data_$10,000-$19,999",
    "annual_individual_earnings_Data_$20,000-$29,999",
    "annual_individual_earnings_Data_$30,000-$39,999",
    "annual_individual_earnings_Data_$40,000-$49,999",
    "annual_individual_earnings_Data_$50,000-$64,999",
    "annual_individual_earnings_Data_$65,000-$74,999",
    "annual_individual_earnings_Data_$75,000-$99,999",
    "annual_individual_earnings_Data_$100,000+",
    "access_to_transport",
    "0_count",
    "10_count",
    "11_count",
    "12_count",
    "13_count",
    "14_count",
    "15_count",
    "16_count",
    "17_count",
    "18_count",
    "19_count",
    "1_count",
    "20_count",
    "21_count",
    "22_count",
    "23_count",
    "2_count",
    "3_count",
    "4_count",
    "5_count",
    "6_count",
    "7_count",
    "8_count",
    "9_count",
    "Arrest (null) count",
    "Arrest ADMINISTRATIVE CODE count",
    "Arrest ADMINISTRATIVE CODES count",
    "Arrest AGRICULTURE & MRKTS LAW-UNCLASSIFIED count",
    "Arrest ALCOHOLIC BEVERAGE CONTROL LAW count",
    "Arrest ANTICIPATORY OFFENSES count",
    "Arrest ARSON count",
    "Arrest ASSAULT 3 & RELATED OFFENSES count",
    "Arrest BURGLAR'S TOOLS count",
    "Arrest BURGLARY count",
    "Arrest CANNABIS RELATED OFFENSES count",
    "Arrest CHILD ABANDONMENT/NON SUPPORT count",
    "Arrest CRIMINAL MISCHIEF & RELATED OF count",
    "Arrest CRIMINAL TRESPASS count",
    "Arrest DANGEROUS DRUGS count",
    "Arrest DANGEROUS WEAPONS count",
    "Arrest DISORDERLY CONDUCT count",
    "Arrest DISRUPTION OF A RELIGIOUS SERV count",
    "Arrest ENDAN WELFARE INCOMP count",
    "Arrest ESCAPE 3 count",
    "Arrest FELONY ASSAULT count",
    "Arrest FOR OTHER AUTHORITIES count",
    "Arrest FORGERY count",
    "Arrest FORTUNE TELLING count",
    "Arrest FRAUDS count",
    "Arrest FRAUDULENT ACCOSTING count",
    "Arrest GAMBLING count",
    "Arrest GRAND LARCENY count",
    "Arrest GRAND LARCENY OF MOTOR VEHICLE count",
    "Arrest HARRASSMENT 2 count",
    "Arrest HOMICIDE-NEGLIGENT,UNCLASSIFIE count",
    "Arrest HOMICIDE-NEGLIGENT-VEHICLE count",
    "Arrest INTOXICATED & IMPAIRED DRIVING count",
    "Arrest INTOXICATED/IMPAIRED DRIVING count",
    "Arrest JOSTLING count",
    "Arrest KIDNAPPING count",
    "Arrest KIDNAPPING & RELATED OFFENSES count",
    "Arrest MISCELLANEOUS PENAL LAW count",
    "Arrest MOVING INFRACTIONS count",
    "Arrest MURDER & NON-NEGL. MANSLAUGHTE count",
    "Arrest NYS LAWS-UNCLASSIFIED FELONY count",
    "Arrest OFF. AGNST PUB ORD SENSBLTY & count",
    "Arrest OFFENSES AGAINST PUBLIC ADMINI count",
    "Arrest OFFENSES AGAINST PUBLIC SAFETY count",
    "Arrest OFFENSES AGAINST THE PERSON count",
    "Arrest OFFENSES INVOLVING FRAUD count",
    "Arrest OFFENSES RELATED TO CHILDREN count",
    "Arrest OTHER OFFENSES RELATED TO THEF count",
    "Arrest OTHER STATE LAWS count",
    "Arrest OTHER STATE LAWS (NON PENAL LA count",
    "Arrest OTHER STATE LAWS (NON PENAL LAW) count",
    "Arrest OTHER TRAFFIC INFRACTION count",
    "Arrest PETIT LARCENY count",
    "Arrest POSSESSION OF STOLEN PROPERTY count",
    "Arrest PROSTITUTION & RELATED OFFENSES count",
    "Arrest RAPE count",
    "Arrest ROBBERY count",
    "Arrest SEX CRIMES count",
    "Arrest THEFT OF SERVICES count",
    "Arrest THEFT-FRAUD count",
    "Arrest UNAUTHORIZED USE OF A VEHICLE count",
    "Arrest VEHICLE AND TRAFFIC LAWS count",
    "Industry_Amusement Arcade",
    "Industry_Amusement Device Permanent",
    "Industry_Amusement Device Portable",
    "Industry_Amusement Device Temporary",
    "Industry_Auction House Premises",
    "Industry_Auctioneer",
    "Industry_Bingo Game Operator",
    "Industry_Booting Company",
    "Industry_Cabaret",
    "Industry_Car Wash",
    "Industry_Catering Establishment",
    "Industry_Commercial Lessor",
    "Industry_Construction Labor Provider",
    "Industry_Dealer In Products",
    "Industry_Debt Collection Agency",
    "Industry_Electronic & Appliance Service",
    "Industry_Electronic Cigarette Dealer",
    "Industry_Electronics Store",
    "Industry_Employment Agency",
    "Industry_Games of Chance",
    "Industry_Gaming Cafe",
    "Industry_Garage",
    "Industry_Garage and Parking Lot",
    "Industry_General Vendor",
    "Industry_General Vendor Distributor",
    "Industry_Home Improvement Contractor",
    "Industry_Home Improvement Salesperson",
    "Industry_Horse Drawn Cab Owner",
    "Industry_Horse Drawn Driver",
    "Industry_Laundries",
    "Industry_Laundry",
    "Industry_Laundry Jobber",
    "Industry_Locksmith",
    "Industry_Locksmith Apprentice",
    "Industry_Motion Picture Projectionist",
    "Industry_Newsstand",
    "Industry_Parking Lot",
    "Industry_Pawnbroker",
    "Industry_Pedicab Business",
    "Industry_Pedicab Driver",
    "Industry_Pool or Billiard Room",
    "Industry_Process Server Individual",
    "Industry_Process Serving Agency",
    "Industry_Scale Dealer Repairer",
    "Industry_Scrap Metal Processor",
    "Industry_Secondhand Dealer - Auto",
    "Industry_Secondhand Dealer - Firearms",
    "Industry_Secondhand Dealer - General",
    "Industry_Sidewalk Cafe",
    "Industry_Sightseeing Bus",
    "Industry_Sightseeing Guide",
    "Industry_Special Sale",
    "Industry_Stoop Line Stand",
    "Industry_Storage Warehouse",
    "Industry_Third Party Food Delivery",
    "Industry_Ticket Seller",
    "Industry_Ticket Seller Business",
    "Industry_Tobacco Retail Dealer",
    "Industry_Tow Truck Company",
    "Industry_Tow Truck Driver",
    "Industry_Tow Truck Exemption"
]

class PredictionService:
    def __init__(self):
        self.model = joblib.load("./models/Pickle_Rick_the_third.pkl")

    def predict(self, data):
        # Get zipcodes mappings from csv
        zipcodes_df = pd.read_csv('./zipcodes.csv')

        input_to_model = question_to_inputs(list(data.values()))

        # Assuming clf is your classifier and it has been trained already
        # Reshape input_to_model to be 2D
        input_to_model_reshaped = np.array(input_to_model).reshape(1, -1)

        # Create a DataFrame with the appropriate column names
        input_df = pd.DataFrame(input_to_model_reshaped, columns=column_names)

        # Predict using the model
        prediction = self.model.predict_log_proba(input_df)

        # Create a dataframe for the probability distribution
        prediction_df = pd.DataFrame(prediction[0], columns=['probability'])
        
        # Add the corresponding zipcodes to the dataframe
        prediction_df['zipcode'] = zipcodes_df

        # Return a dictionary of key/value pairs where the key is the zipcode and the value is the probability
        return dict(zip(prediction_df['zipcode'], prediction_df['probability']))

    


