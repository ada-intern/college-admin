/**
 * Tabs Component
 * 
 * A reusable tabbed navigation component for switching between different
 * content sections. Used in both AdminDashboard and StudentView to provide
 * consistent navigation across college information sections.
 * 
 * Features:
 * - Horizontal tab navigation
 * - Active tab highlighting
 * - Hover effects for better UX
 * - Accessible navigation with ARIA labels
 * - Responsive design with proper spacing
 * 
 * Tab Naming Convention:
 * - Display names use proper case with spaces and ampersands
 * - Internal keys convert to lowercase with underscores replacing spaces and ampersands
 * - Example: "Hostel & Campus" becomes "hostel_campus"
 * 
 * @component
 * @author College Portal Team
 */

import { TABS_CONFIG } from '../data';

/**
 * Tabs Component
 * 
 * Renders a horizontal tab navigation interface for content sections.
 * Implements controlled component pattern for active tab management.
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab key (lowercase with underscores)
 * @param {Function} props.setActiveTab - Function to update active tab
 * @returns {JSX.Element} Tabbed navigation interface
 */
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4 border-b border-gray-200">
      {/* Accessible navigation with ARIA label */}
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {/* Generate tab buttons from configuration */}
        {TABS_CONFIG.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}
            className={`${
              // Conditional styling based on active state
              // Active tab: indigo border and text
              // Inactive tab: transparent border with hover effects
              activeTab === tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {/* Display the original tab name (with proper formatting) */}
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
