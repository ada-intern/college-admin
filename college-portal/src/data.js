/**
 * Data Management Module
 * 
 * This module serves as the data layer for the College Portal application,
 * providing centralized data management through localStorage persistence.
 * It handles initialization, retrieval, and updates of college information.
 * 
 * Architecture:
 * - Uses localStorage as a client-side database simulation
 * - Provides a clean API for data operations
 * - Handles data initialization with default seed data
 * - Supports multiple content formats (HTML, plaintext, markdown)
 * 
 * Data Structure:
 * ```
 * COLLEGES = {
 *   "1": {
 *     name: "College Name",
 *     tabs: {
 *       "tab_key": {
 *         html: "Rich text content",
 *         plaintext: "Plain text version",
 *         markdown: "Markdown version"
 *       }
 *     }
 *   }
 * }
 * ```
 * 
 * Key Features:
 * - Automatic data seeding on first load
 * - Multiple content format support
 * - Consistent tab key formatting
 * - localStorage persistence
 * - Error handling for missing data
 * 
 * @module data
 * @author College Portal Team
 * @version 1.0.0
 */

/**
 * TABS_CONFIG - Centralized Tab Configuration
 * 
 * Defines all available content tabs for college profiles.
 * This array serves as the single source of truth for tab names
 * across the application, ensuring consistency.
 * 
 * Tab Key Generation:
 * - Display names are converted to lowercase
 * - Spaces are replaced with underscores
 * - Ampersands (&) are replaced with underscores
 * - Example: "Hostel & Campus" becomes "hostel_campus"
 * 
 * @type {string[]}
 */
const TABS = [
  'Courses',              // Academic programs offered
  'Admission Process',    // Application and admission requirements
  'Placements',          // Job placement statistics and companies
  'Scholarships',        // Financial aid and scholarship information
  'Hostel & Campus',     // Campus facilities and accommodation
  'Rankings',            // College rankings and accreditations
  'Gallery',             // Photos and virtual tours
  'Cut-offs',            // Admission cut-off scores
  'Work while studying'  // Part-time work opportunities
];

/**
 * COLLEGES - Default Seed Data
 * 
 * Initial college data used to populate localStorage on first application load.
 * Each college contains basic information and tab content in multiple formats.
 * 
 * Structure:
 * - Key: College ID (string)
 * - Value: College object with name and tabs
 * - Each tab contains content in HTML, plaintext, and markdown formats
 * 
 * @type {Object.<string, {name: string, tabs: Object}>}
 */
const COLLEGES = {
  1: {
    name: 'ABC Institute',
    // Generate tab structure dynamically from TABS configuration
    tabs: TABS.reduce((acc, tab) => {
      // Convert tab name to consistent key format
      const tabKey = tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
      
      // Initialize with default content in multiple formats
      acc[tabKey] = {
        html: `<p>Content for ${tab}</p>`,           // Rich text format
        plaintext: `Content for ${tab}`,            // Plain text format
        markdown: `Content for **${tab}**`          // Markdown format
      };
      return acc;
    }, {})
  },
  2: {
    name: 'XYZ College',
    // Generate tab structure for second college
    tabs: TABS.reduce((acc, tab) => {
      const tabKey = tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
      acc[tabKey] = {
        html: `<p>Details about ${tab}</p>`,
        plaintext: `Details about ${tab}`,
        markdown: `Details about **${tab}**`
      };
      return acc;
    }, {})
  }
};

/**
 * Initialize Application Data
 * 
 * Sets up the initial data structure in localStorage if it doesn't exist.
 * This function is called on application startup to ensure data availability.
 * 
 * Process:
 * 1. Check if 'colleges' key exists in localStorage
 * 2. If not found, seed with default COLLEGES data
 * 3. Stringify and store the data
 * 
 * Note: This only runs once per browser/device unless localStorage is cleared
 */
export const initializeData = () => {
  // Check if data already exists to avoid overwriting user changes
  if (!localStorage.getItem('colleges')) {
    // Seed localStorage with initial college data
    localStorage.setItem('colleges', JSON.stringify(COLLEGES));
    console.log('Initialized college data in localStorage');
  }
};

/**
 * Get All Colleges
 * 
 * Retrieves all college data from localStorage.
 * 
 * @returns {Object.<string, Object>} Object containing all colleges indexed by ID
 * @returns {Object} Empty object if no data exists or parsing fails
 */
export const getColleges = () => {
  try {
    // Parse and return stored college data
    return JSON.parse(localStorage.getItem('colleges')) || {};
  } catch (error) {
    // Handle JSON parsing errors gracefully
    console.error('Error parsing college data from localStorage:', error);
    return {};
  }
};

/**
 * Get College by ID
 * 
 * Retrieves a specific college's data by its ID.
 * 
 * @param {string} id - The unique identifier for the college
 * @returns {Object|undefined} College object if found, undefined otherwise
 */
export const getCollegeById = (id) => {
  const colleges = getColleges();
  return colleges[id];
};

/**
 * Update College Data
 * 
 * Updates the content for a specific tab of a specific college.
 * Handles partial updates while preserving existing data structure.
 * 
 * @param {string} id - College ID to update
 * @param {string} tab - Tab key to update (formatted with underscores)
 * @param {Object} data - New content data object
 * @param {string} data.html - HTML content
 * @param {string} data.plaintext - Plain text content
 * @param {string} data.markdown - Markdown content
 * 
 * Process:
 * 1. Retrieve current college data
 * 2. Verify college exists
 * 3. Update specific tab content
 * 4. Save back to localStorage
 */
export const updateCollegeData = (id, tab, data) => {
  try {
    const colleges = getColleges();
    
    // Verify college exists before updating
    if (colleges[id]) {
      // Update the specific tab with new data
      colleges[id].tabs[tab] = data;
      
      // Persist changes to localStorage
      localStorage.setItem('colleges', JSON.stringify(colleges));
      console.log(`Updated ${tab} for college ${id}`);
    } else {
      console.warn(`College with ID ${id} not found`);
    }
  } catch (error) {
    // Handle storage errors gracefully
    console.error('Error updating college data:', error);
  }
};

// Export the TABS configuration for use in components
export const TABS_CONFIG = TABS;