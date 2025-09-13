/**
 * Main Application Component
 * 
 * This is the root component of the College Portal application that provides
 * a navigation interface to switch between Admin and Student views.
 * 
 * Features:
 * - Navigation bar with view switching buttons
 * - Conditional rendering of AdminDashboard or StudentView
 * - Responsive design with Tailwind CSS
 * 
 * @component
 * @author College Portal Team
 */

import { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import StudentView from './components/StudentView';

/**
 * App Component - Main application entry point
 * 
 * Manages the global view state and renders the appropriate component
 * based on user selection (Admin or Student view).
 * 
 * @returns {JSX.Element} The main application layout with navigation
 */
function App() {
  // State to track current view mode - either 'admin' for administrative functions or 'student' for read-only view
  const [view, setView] = useState('admin');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">College Portal</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setView('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Admin View
              </button>
              <button
                onClick={() => setView('student')}
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'student' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Student View
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {view === 'admin' ? <AdminDashboard /> : <StudentView />}
        </div>
      </main>
    </div>
  );
}

export default App;
