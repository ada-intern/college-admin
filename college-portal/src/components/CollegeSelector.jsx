/**
 * College Selector Component
 * 
 * A reusable dropdown component for selecting colleges from the available list.
 * Used in both AdminDashboard and StudentView components to provide consistent
 * college selection functionality.
 * 
 * Features:
 * - Dropdown select with all available colleges
 * - Controlled component pattern with external state management
 * - Accessible form labeling
 * - Consistent styling with Tailwind CSS
 * 
 * @component
 * @author College Portal Team
 */

import { getColleges } from '../data';

/**
 * CollegeSelector Component
 * 
 * Renders a dropdown select element populated with available colleges.
 * Implements controlled component pattern for state management.
 * 
 * @param {Object} props - Component props
 * @param {string} props.selectedCollege - Currently selected college ID
 * @param {Function} props.setSelectedCollege - Function to update selected college
 * @returns {JSX.Element} College selection dropdown
 */
const CollegeSelector = ({ selectedCollege, setSelectedCollege }) => {
  // Fetch all available colleges from localStorage via data.js
  const colleges = getColleges();

  return (
    <div className="mb-4">
      {/* Accessible label for the select element */}
      <label htmlFor="college-select" className="block text-sm font-medium text-gray-700">
        Select a College
      </label>
      
      {/* Controlled select element with college options */}
      <select
        id="college-select"
        value={selectedCollege}
        onChange={(e) => setSelectedCollege(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {/* Default placeholder option */}
        <option value="">-- Select a College --</option>
        
        {/* Dynamically generate options from colleges data */}
        {/* Object.entries converts the colleges object to [id, collegeData] pairs */}
        {Object.entries(colleges).map(([id, { name }]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CollegeSelector;
