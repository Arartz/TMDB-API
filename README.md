# MovieHub - TMDb Movie Application

A modern, responsive movie web application built with React and TMDb API.

## Features

- Browse trending movies
- Search for movies
- View detailed movie information
- Browse movies by genre
- Responsive design for all devices
- Modern UI with smooth animations

## Technologies Used

- React
- React Router
- Axios
- TailwindCSS
- TMDb API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDb API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moviehub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Get your TMDb API key:
   - Go to [TMDb](https://www.themoviedb.org/)
   - Create an account or sign in
   - Go to your profile settings
   - Click on "API" in the left sidebar
   - Request an API key (choose "Developer" option)
   - Copy your API key

4. Update the API key in `src/services/tmdb.js`:
```javascript
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/services/` - API services and utilities
- `public/` - Static assets

## License

This project is licensed under the MIT License.
