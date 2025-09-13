/**
 * Toast Notification Component
 * 
 * A global toast notification system that displays temporary messages to users.
 * Uses a custom event system to allow any component to trigger notifications
 * without direct component coupling.
 * 
 * Features:
 * - Global event-based notification system
 * - Auto-dismiss after 3 seconds
 * - Support for different notification types (success, error)
 * - Fixed positioning with high z-index
 * - Smooth transitions and animations
 * - Timeout management to prevent overlapping notifications
 * 
 * Usage:
 * - Import and use showToast() from toastUtils.js
 * - Toast component should be rendered once at the app level
 * 
 * @component
 * @author College Portal Team
 */

import { useState, useEffect } from 'react';

// Global timeout variable to manage toast auto-dismiss
// Declared outside component to persist across re-renders
let toastTimeout;

/**
 * Toast Component
 * 
 * Renders toast notifications triggered by custom events.
 * Manages visibility, message content, and auto-dismiss functionality.
 * 
 * @returns {JSX.Element|null} Toast notification or null if not visible
 */
const Toast = () => {
  // State for controlling toast visibility
  const [visible, setVisible] = useState(false);
  
  // State for storing the notification message
  const [message, setMessage] = useState('');
  
  // State for storing the notification type (success, error, etc.)
  const [type, setType] = useState('success');

  /**
   * Effect hook to set up global event listener for toast notifications
   * 
   * Listens for 'show-toast' custom events and:
   * - Updates toast content and type
   * - Shows the toast
   * - Sets up auto-dismiss timer
   * - Clears any existing timers to prevent conflicts
   */
  useEffect(() => {
    /**
     * Handles the custom 'show-toast' event
     * 
     * @param {CustomEvent} event - Custom event with toast details
     * @param {Object} event.detail - Event payload
     * @param {string} event.detail.message - Toast message to display
     * @param {string} event.detail.type - Toast type (success, error, etc.)
     */
    const handleShowToast = (event) => {
      const { message, type } = event.detail;
      
      // Update toast content
      setMessage(message);
      setType(type);
      setVisible(true);

      // Clear any existing timeout to prevent conflicts
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }

      // Set up auto-dismiss after 3 seconds
      toastTimeout = setTimeout(() => {
        setVisible(false);
      }, 3000);
    };

    // Add event listener for toast notifications
    window.addEventListener('show-toast', handleShowToast);
    
    // Cleanup: remove event listener on component unmount
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  // Don't render anything if toast is not visible
  if (!visible) return null;

  // Determine background color based on notification type
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300`}>
      {message}
    </div>
  );
};

export default Toast;
