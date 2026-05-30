# Weather Stats

A responsive weather dashboard that shows current weather and a 5-day forecast for any city using the OpenWeatherMap API.

## Features

- Search weather by city
- Current weather details:
  - Temperature
  - Feels like
  - Humidity
  - Visibility
  - Wind speed
  - Weather description
  - Country code
- 5-day forecast cards
- Weather icons
- Responsive layout
- Dismissible intro banner

## Tech Stack

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## Live Demo

https://nomanaliansari.github.io/Weather_Stats/

## Screenshots

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3c018446-f69f-4dac-95c4-f87f166054c5" />


## How It Works

1. User enters a city name
2. JavaScript sends a request to OpenWeatherMap
3. API returns current weather and forecast data
4. The UI updates dynamically with the fetched information

## API Used

- Current weather endpoint
- 5-day forecast endpoint

## Setup

1. Clone the repository
2. Open `index.html` in your browser
3. Add your OpenWeatherMap API key in `script.js`

## Notes

- The forecast API returns data in 3-hour intervals.
- This project summarizes it into 5 daily cards.

## Learning Outcomes

- DOM manipulation
- Fetch API
- Async/await
- Error handling
- Working with third-party APIs
- UI state changes

## Future Improvements

- Show hourly forecast
- Add search history
- Add temperature unit toggle
- Improve error UI
