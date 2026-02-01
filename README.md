# Arbitrage City: AI-Powered Real Estate Investment Engine 🏙️

![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![Azure](https://img.shields.io/badge/Azure-Cloud-0078D4)
![Databricks](https://img.shields.io/badge/Databricks-Data_Engineering-FF3621)

**Authors:** Mohamed Diab, Bayan Khateeb  
**Course:** Data Collection & Management Lab (Technion)

## 📌 Project Overview
**Arbitrage City** is an automated pipeline that bridges the gap between Long-term Real Estate listings (buying) and Short-term Rental data (Airbnb). It addresses the "Blind Spot" in real estate investment—the gap between asking prices and actual potential yield.

By scraping live listings and predicting their potential Airbnb revenue using Random Forest, the system identifies "Arbitrage Opportunities"—properties with high net yields that manual analysis misses.

## 🚀 Features
- **Robust Scraper:** Uses Playwright & Session Rotation to bypass WAFs on real estate sites.
- **Inclusive Feature Engineering:** Quantifies "Luxury" and "Penthouse" status from text descriptions.
- **Geospatial Matching:** Maps sales listings to rental zones using ArcGIS.
- **Yield Prediction:** Calculates Net ROI accounting for 40% expense ratio and 55% occupancy.

## 🛠️ Tech Stack
- **Infrastructure:** Azure Databricks, Spark
- **Scraping:** Python Playwright, BeautifulSoup
- **ML:** Scikit-Learn (Random Forest Regressor)
- **Geo:** Geopy (ArcGIS), Plotly Mapbox

## 📊 Results
- **Training Dataset:** 24,437 Airbnb Listings.
- **Arbitrage Ops Found:** 674 Properties (>5% Net Yield).
- **Performance:** Achieved a projected **9.9% Average Yield** (vs Market Avg 3%).

## 🔐 Security & Configuration
This project requires credentials for BrightData (scraping) and Azure (storage).

1. **For Instructors:** The `secrets.json` file is provided in the private Azure submission folder (`submissions/bayan_mohammad/`). Download it and place it in the root directory of this project to enable full functionality.
2. **Manual Setup:** Alternatively, create a `secrets.json` file in the root directory with the following format:
```json
{
    "BRIGHTDATA_USER": "your_user",
    "BRIGHTDATA_PASS": "your_password",
    "BRIGHTDATA_HOST": "your_host",
    "AZURE_STORAGE_ACCOUNT": "your_account",
    "AZURE_CONTAINER": "your_container",
    "AZURE_SAS_TOKEN": "your_sas_token"
}
```
*Note: This file is ignored by Git to prevent accidental exposure of private keys.*

## 📂 Project Structure
- `src/`: 
    - `1_scraper_properstar.ipynb`: The extraction logic for real estate data.
    - `2_arbitrage_city_ml.ipynb`: The end-to-end ML pipeline (Loading, Cleaning, Training, Predicting).
- `data/`: Dataset files (Ignored for confidentiality).
- `docs/`: Project poster and visuals.
- `presentation/`: Web-based map visualization source code.

## 🌐 Visualizations
- [**Interactive Map (Netlify)**](https://hilarious-fenglisu-693e85.netlify.app/)
- [**Project Demo (YouTube)**](https://youtu.be/Dd-n1cR28pA?si=rTUPVtx4c0u9n_6g)

## ☁️ Dataset Location
**Azure Storage:** `submissions/bayan_mohammad/`  
*(Accessible to course staff via the Azure Portal)*

## 💻 How to Run
1. **Prerequisites:** 
   - A Databricks environment (or local Jupyter with Spark installed).
   - Install dependencies: `pip install -r requirements.txt`.
2. **Data Extraction (Optional):**
   - Run `1_scraper_properstar.ipynb` to scrape live listings (Requires Proxies/Headless Browser).
3. **Data Setup:**
   - Download `nyc_enriched_progress.csv` from the link in the Appendix (Azure).
   - **Upload the CSV** to the same folder as the notebook `2_arbitrage_city_ml.ipynb`.
4. **Execution:**
   - Run `2_arbitrage_city_ml.ipynb`.
   - The notebook will handle cleaning, geocoding, ML training, and visualization.