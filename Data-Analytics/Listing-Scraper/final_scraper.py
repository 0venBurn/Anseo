import csv
import json
import os
import time
from dotenv import load_dotenv
import logging


import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import geopandas as gpd
from shapely.geometry import Point
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from pyvirtualdisplay import Display

# Initialize virtual display
display = Display(visible=0, size=(1920, 1080))
display.start()

# Setup logging
logging.basicConfig(level=logging.INFO, filename='scraper.log', filemode='a',
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Set Chrome options for headless operation
options = Options()
options.headless = True
options.binary_location = "/opt/chrome/chrome-linux64/chrome" 
options.add_argument("--headless") 
options.add_argument("--no-sandbox") 
options.add_argument("--disable-dev-shm-usage") 

# Set location urls 
urls = [
    "https://www.loopnet.com/search/commercial-real-estate/brooklyn-ny/for-lease/",
    "https://www.loopnet.com/search/commercial-real-estate/staten-island-ny/for-lease/",
    "https://www.loopnet.com/search/commercial-real-estate/bronx-ny/for-lease/",
    "https://www.loopnet.com/search/commercial-real-estate/manhattan__new-york-ny/for-lease/",
    "https://www.loopnet.com/search/commercial-real-estate/queens-ny/for-lease/",
]

service = Service(executable_path='/usr/local/bin/chromedriver')
driver = webdriver.Chrome(service=service, options=options)

def go_to_next_page(driver):
    try:
        # Find the next page link
        next_page_link = driver.find_element(
            By.XPATH, "//a[contains(@aria-label, 'Go to next page')]"
        )
        next_page_link.click()
        # wait for page loading
        time.sleep(5)  
        return True
    except Exception as e:
        print("No more pages or error navigating to the next page:", e)
        return False
map_pins_data = []
listing_details = []

# Loop through each url
for url in urls:
    driver.get(url)
    time.sleep(5)
    # Get map tacks in bulk
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")
    map_data_layer_div = soup.find("div", attrs={"map-data-layer": True})
    map_pin_divs = (
        map_data_layer_div.find_all("div", attrs={"map-pin": True})
        if map_data_layer_div
        else []
    )

    # Extract id, lat, and lon for each map pin div
    
    for map_pin in map_pin_divs:
        pin_id = map_pin.get("id")
        lat = map_pin.get("lat")
        lon = map_pin.get("lon")
        map_pins_data.append({"id": pin_id, "lat": lat, "lon": lon})
        print(f"Map pin ID: {pin_id}, Latitude: {lat}, Longitude: {lon}")

    
    page_number = 1
    while True:

        try:
            print(f"Currently on page {page_number} of {url}")
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")

            placard_event_model = soup.find("div", class_="placards").get(
                "placard-event-model"
            )
            placard_data = json.loads(placard_event_model)

            listings = soup.find_all("article", class_="placard")
        except Exception as e:
            print("Error extracting data from page:", e)
            break
        
        # Extract data from each listing
        for listing in listings:
            # Extract Listing ID from data attributes
            data_id = listing.get("data-id")

            # Extract the listing link
            link_tag = listing.find("a", title=True)
            listing_link = link_tag.get("href") if link_tag else None

            # Details extraction
            details_div = listing.find("ul", class_="data-points-2c")
            if not details_div:
                details_div = listing.find("ul", class_="data-points-a")
            details_list = details_div.find_all("li") if details_div else []
            details = [detail.get_text(strip=True) for detail in details_list]
            details = ", ".join(details)

            # Extract image URL
            img_tag = listing.find("img", class_="image-hide")
            img_url = img_tag.get("src") if img_tag else None

            # Collect listing details
            listing_details.append(
                {
                    "WatchPropertyID": data_id,
                    "ListingDetails": details,
                    "Link": listing_link,
                    "ImageURL": img_url,
                }
            )

        # Loop to next page and break if no new pages
        if not go_to_next_page(driver):
            break
        page_number += 1

driver.quit()
display.stop()

map_pins_df = pd.DataFrame(map_pins_data)

listing_details_df = pd.DataFrame(listing_details)

# Load neighborhood geometry data from geojson
neighborhoods = gpd.read_file("nyc_neighborhoods.geojson")

# Load neighbourhoods info
neighbourhoodsInfo = pd.read_csv("neighbourhoods.csv")

merged_neighborhoods = neighborhoods.merge(neighbourhoodsInfo, left_on='NTAName', right_on='name', how='left')

# Create a column in listings called "neighborhood" and initialize it
map_pins_df["neighborhood_id"] = None


# Define a function to get the neighborhood from coordinates
def get_neighborhood(lat, lon):
    point = Point(lon, lat)  # Create point
    # Check if the point is within any neighborhood polygon
    for idx, neighborhood in merged_neighborhoods.iterrows():
        if neighborhood['geometry'].contains(point):
            return neighborhood['neighbourhood_id']
    return "Not Found"

# Update listings with neighborhood name
map_pins_df['neighborhood_id'] = map_pins_df.apply(lambda row: get_neighborhood(row['lat'], row['lon']), axis=1)

#merge map_pins_df with listing_details_df
merged_data = pd.merge(map_pins_df, listing_details_df, left_on='id', right_on='WatchPropertyID', how='left')
merged_data.rename(columns={
    'id': 'id',
    'lat': 'lat',
    'lon': 'lon',
    'neighborhood_id': 'neighbourhood_id',
    'ListingDetails': 'listingdetails',
    'Link': 'link',
    'ImageURL': 'imageurl'
}, inplace=True)

merged_data['id'] = pd.to_numeric(merged_data['id'], errors='coerce')
merged_data['neighbourhood_id'] = pd.to_numeric(merged_data['neighbourhood_id'], errors='coerce')
merged_data['lat'] = pd.to_numeric(merged_data['lat'], errors='coerce')
merged_data['lon'] = pd.to_numeric(merged_data['lon'], errors='coerce')
merged_data['listingdetails'] = merged_data['listingdetails'].astype(str)
merged_data['link'] = merged_data['link'].astype(str)
merged_data['imageurl'] = merged_data['imageurl'].astype(str)


# Load environment variables from .env file
load_dotenv()

# Database connection setup
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('DB_NAME')

# SQLAlchemy engine for PostgreSQL
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')

with engine.connect() as conn:
    # Attempt to create a test table mirroring the main table's structure (simplified example)
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS listing_data_test (
            id INTEGER,
            lat FLOAT,
            lon FLOAT,
            neighbourhood_id INTEGER,
            listingdetails TEXT,
            link TEXT,
            imageurl TEXT
        );
    """))

# Insert data into the test table
with engine.connect() as conn:
    merged_data.to_sql('listing_data_test', con=conn, if_exists='replace', index=False)


with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM listing_data_test LIMIT 10;"))
    for row in result:
        print(row)

#connect to listing_details table, removing all the data that exists and adding the merfged_data
# with engine.connect() as conn:
#     conn.execute(text("TRUNCATE TABLE listing_data"))
#     merged_data.to_sql('listing_details', conn, if_exists='append', index=False)

    




