import { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import StudentView from './components/StudentView';

function App() {
  const [view, setView] = useState('admin'); // 'admin' or 'student'

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