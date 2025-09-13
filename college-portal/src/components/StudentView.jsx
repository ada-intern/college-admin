/**
 * Student View Component
 * 
 * This component provides a read-only interface for students to view college information.
 * It displays college content in a clean, organized layout with tabbed navigation
 * and additional sidebar information.
 * 
 * Key Features:
 * - College selection dropdown
 * - Tabbed content display (read-only)
 * - Sanitized HTML content rendering
 * - Sidebar with recruiter logos and contact information
 * - Responsive grid layout
 * 
 * Security:
 * - Uses DOMPurify to sanitize HTML content before rendering
 * - Prevents XSS attacks through content sanitization
 * 
 * Dependencies:
 * - DOMPurify for HTML sanitization
 * - ReactMarkdown for potential markdown rendering (imported but not currently used)
 * 
 * @component
 * @author College Portal Team
 */

import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import CollegeSelector from "./CollegeSelector";
import Tabs from "./Tabs";
import { getCollegeById, TABS_CONFIG } from "../data";

/**
 * StudentView Component
 * 
 * Renders a student-facing interface for viewing college information.
 * Provides read-only access to college content with enhanced presentation.
 * 
 * @returns {JSX.Element} The complete student view interface
 */
const StudentView = () => {
  // State for tracking which college is currently selected for viewing
  const [selectedCollege, setSelectedCollege] = useState("");
  
  // State for tracking the active tab/section being viewed
  // Default to first tab, converted to lowercase with spaces/ampersands replaced with underscores
  const [activeTab, setActiveTab] = useState(
    TABS_CONFIG[0].toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")
  );
  
  // State for storing the complete college data object
  const [collegeData, setCollegeData] = useState(null);

  /**
   * Effect hook to load college data when selection changes
   * 
   * This effect runs whenever selectedCollege changes and:
   * - Fetches the college data from localStorage
   * - Resets data when no college is selected
   * 
   * Note: Unlike AdminDashboard, this doesn't depend on activeTab
   * since we don't need to reload data when switching tabs in read-only mode
   */
  useEffect(() => {
    if (selectedCollege) {
      // Fetch college data from localStorage via data.js
      setCollegeData(getCollegeById(selectedCollege));
    } else {
      // Reset state when no college is selected
      setCollegeData(null);
    }
  }, [selectedCollege]);

  /**
   * Renders the content for the currently active tab
   * 
   * This function:
   * 1. Validates that college data exists
   * 2. Retrieves content for the active tab
   * 3. Sanitizes HTML content using DOMPurify for security
   * 4. Returns JSX with sanitized HTML or fallback message
   * 
   * @returns {JSX.Element|null} Rendered content or null if no data
   */
  const renderContent = () => {
    // Return null if no college is selected
    if (!collegeData) return null;
    
    // Get content for the currently active tab
    const content = collegeData.tabs[activeTab];
    
    // Show fallback message if no content exists for this tab
    if (!content) return <p>No content available for this tab.</p>;

    // Render sanitized HTML content using DOMPurify to prevent XSS attacks
    // The 'prose' class provides typography styling for the content
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content.html, {
            ADD_TAGS: ['table', 'tbody', 'thead', 'tr', 'th', 'td'],
            ADD_ATTR: ['border', 'style'],
          }),
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white shadow p-4 rounded-lg flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          College Information
        </h1>
        <CollegeSelector
          selectedCollege={selectedCollege}
          setSelectedCollege={setSelectedCollege}
        />
      </header>

      {selectedCollege && collegeData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-4">{renderContent()}</div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="font-semibold text-gray-700 mb-4">
                Our Top Recruiters
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["google", "amazon", "honeywell", "ford"].map((logo) => (
                  <img
                    key={logo}
                    src={`/${logo}.png`}
                    alt={logo}
                    className="h-10 object-contain"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="font-semibold text-gray-700 mb-4">
                Contact Information
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> +1 617-253-1000
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> admissions@mit.edu
              </p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> 77 Massachusetts Ave, Cambridge, MA
              </p>
              <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
                View on Map
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default StudentView;
