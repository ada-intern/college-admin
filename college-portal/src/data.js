/**
 * Data Management Module
 * 
 * This module handles all data-related operations for the application,
 * including data initialization, retrieval, and updates. It uses localStorage
 * for persistent storage, simulating a client-side database.
 * 
 * Key Features:
 * - Initial data seeding for colleges and tabs
 * - localStorage-based data persistence
 * - Functions for getting all colleges, a single college by ID, and updating data
 * - Centralized configuration for tabs
 * 
 * Data Structure:
 * - COLLEGES: An object where keys are college IDs and values are college data objects
 * - Each college object contains a 'name' and a 'tabs' object
 * - The 'tabs' object contains content for each section, with keys formatted as lowercase_with_underscores
 * - Each tab content object stores data in three formats: html, plaintext, and markdown
 * 
 * @module data
 * @author College Portal Team
 */

/**
 * TABS_CONFIG - Centralized configuration for tab names
 * 
 * This array defines the display names for all tabs used in the application.
 * It ensures consistency across different components and simplifies tab management.
 * 
 * @type {string[]}
 */
const TABS = [
  'Courses',
  'Admission Process',
  'Placements',
  'Scholarships',
  'Hostel & Campus',
  'Rankings',
  'Gallery',
  'Cut-offs',
  'Work while studying'
];

/**
 * COLLEGES - Initial seed data for the application
 * 
 * This object contains the default college data that will be used to populate
 * localStorage if no data exists. It provides a consistent starting point for
 * the application.
 * 
 * @type {Object.<string, {name: string, tabs: Object.<string, {html: string, plaintext: string, markdown: string}>}>}
 */
const COLLEGES = {
  1: {
    name: 'ABC Institute',
    tabs: TABS.reduce((acc, tab) => {
      // Generate tab keys by converting to lowercase and replacing spaces/ampersands with underscores
      acc[tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')] = {
        html: `<p>Content for ${tab}</p>`,
        plaintext: `Content for ${tab}`,
        markdown: `Content for **${tab}**`
      };
      return acc;
    }, {})
  },
  2: {
    name: 'XYZ College',
    tabs: TABS.reduce((acc, tab) => {
      acc[tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')] = {
        html: `<p>Details about ${tab}</p>`,
        plaintext: `Details about ${tab}`,
        markdown: `Details about **${tab}**`
      };
      return acc;
    }, {})
  }
};

/**
 * Initializes the application data in localStorage
 * 
 * Checks if college data already exists in localStorage. If not, it seeds
 * the storage with the initial COLLEGES data. This ensures that the application
 * always has data to work with on first load.
 */
export const initializeData = () => {
  if (!localStorage.getItem('colleges')) {
    localStorage.setItem('colleges', JSON.stringify(COLLEGES));
  }
};

/**
 * Retrieves all colleges from localStorage
 * 
 * @returns {Object.<string, Object>} An object containing all colleges, or an empty object if none exist
 */
export const getColleges = () => {
  return JSON.parse(localStorage.getItem('colleges')) || {};
};

/**
 * Retrieves a single college by its ID from localStorage
 * 
 * @param {string} id - The ID of the college to retrieve
 * @returns {Object|undefined} The college object, or undefined if not found
 */
export const getCollegeById = (id) => {
  const colleges = getColleges();
  return colleges[id];
};

/**
 * Updates the data for a specific tab of a college in localStorage
 * 
 * @param {string} id - The ID of the college to update
 * @param {string} tab - The key of the tab to update (e.g., 'admission_process')
 * @param {Object} data - The new data object for the tab (containing html, plaintext, markdown)
 */
export const updateCollegeData = (id, tab, data) => {
  const colleges = getColleges();
  if (colleges[id]) {
    colleges[id].tabs[tab] = data;
    localStorage.setItem('colleges', JSON.stringify(colleges));
  }
};

// Export the TABS array for use in other components
export const TABS_CONFIG = TABS;
