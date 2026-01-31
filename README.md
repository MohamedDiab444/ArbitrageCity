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

## 📂 Project Structure
- `src/`: Contains `ArbitrageCity_Main.ipynb` (End-to-end pipeline: Scraping, Cleaning, Training, Predicting).
- `data/`: Dataset files (Ignored for confidentiality).
- `docs/`: Project poster and visuals.
- `presentation/`: Web-based map visualization source code.

## 🌐 Visualizations
- [**Interactive Map (Netlify)**](https://hilarious-fenglisu-693e85.netlify.app/)
- [**Project Demo (YouTube)**](#) *(Link to be added)*

## 💻 Getting Started

### Prerequisites
- Python 3.9+
- Jupyter Notebook

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Place confidential CSV files (`nyc_arbitrage_final.csv`) in the `data/` directory.

### Usage
Run the main notebook in `src/`:
```bash
jupyter notebook src/ArbitrageCity_Main.ipynb
```
The notebook handles the full pipeline:
1. **Scraping** (Requires Proxies/Headless Browser configuration).
2. **Data Loading & Cleaning**.
3. **Inclusive Logic** (Luxury Score generation).
4. **Model Training & Map Visualization**.