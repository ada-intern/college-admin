/**
 * College Profile Management Application
 * 
 * This is the main entry point for the College Profile Management system.
 * It provides a dual-view interface allowing users to switch between:
 * - Admin View: Full editing capabilities with CKEditor integration
 * - Student View: Read-only display with enhanced presentation
 * 
 * Key Features:
 * - View switching with useState (no routing library used as per requirements)
 * - Responsive navigation bar with view toggle buttons
 * - Modern UI design with Tailwind CSS and custom color variables
 * - Toast notification system integration
 * - Data persistence through localStorage
 * 
 * Architecture:
 * - Uses React hooks for state management
 * - Component-based architecture with clear separation of concerns
 * - Custom CSS variables for consistent theming
 * - Event-driven toast notification system
 * 
 * @component
 * @author College Portal Team
 * @version 1.0.0
 */

import { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import StudentView from './components/StudentView';
import Toast from './components/Toast';
import { initializeData } from './data';

// Initialize localStorage with default college data on app startup
// This ensures the app always has data to work with on first load
initializeData();

/**
 * Main App Component
 * 
 * Manages the global application state and renders the appropriate view
 * based on user selection. Provides a clean interface for switching
 * between admin and student modes.
 * 
 * @returns {JSX.Element} The complete application with navigation and content
 */
function App() {
  // State to track current view mode
  // 'admin' - Shows AdminDashboard with editing capabilities
  // 'student' - Shows StudentView with read-only display
  const [view, setView] = useState('admin');

  return (
    <div className="min-h-screen bg-grayLighter">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-grayLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo/Brand Section */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary">College Portal</h1>
              </div>
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  view === 'admin' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                aria-label="Switch to Admin View"
              >
                Admin View
              </button>
              <button
                onClick={() => setView('student')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  view === 'student' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                aria-label="Switch to Student View"
              >
                Student View
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        {/* Conditional rendering based on current view state */}
        {view === 'admin' ? <AdminDashboard /> : <StudentView />}
      </main>
      
      {/* Global Toast Notification System */}
      {/* This component listens for custom events and displays notifications */}
      <Toast />
    </div>
  );
}

export default App;