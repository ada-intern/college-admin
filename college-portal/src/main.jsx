/**
 * Application Entry Point
 * 
 * This file is the main entry point for the React application. It handles:
 * 1. Importing necessary dependencies from React and ReactDOM
 * 2. Importing global styles for the application
 * 3. Importing the root App component
 * 4. Initializing application data using the data module
 * 5. Rendering the root component into the DOM
 * 
 * Key Operations:
 * - Data Initialization: Calls initializeData() to ensure localStorage is seeded
 *   with default college data before the application renders.
 * - Root Rendering: Uses createRoot() from ReactDOM for concurrent rendering,
 *   which is the modern standard for React applications.
 * - StrictMode: Wraps the App component in <StrictMode> to enable checks and
 *   warnings for potential problems in the application during development.
 * 
 * @module main
 * @author College Portal Team
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeData } from './data.js'

// Initialize application data before rendering
// This ensures that localStorage has the necessary data when components mount
initializeData();

// Create a root for the React application and render the App component
// The 'root' element is defined in public/index.html
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential issues in the application
  <StrictMode>
    <App />
  </StrictMode>,
)
