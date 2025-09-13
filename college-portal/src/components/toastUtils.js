/**
 * Toast Utilities
 * 
 * Utility functions for triggering toast notifications throughout the application.
 * Uses the browser's custom event system to provide a decoupled notification system
 * that doesn't require direct component references.
 * 
 * This approach allows any component to trigger notifications without importing
 * or directly referencing the Toast component, making the system more flexible
 * and maintainable.
 * 
 * @module toastUtils
 * @author College Portal Team
 */

/**
 * Triggers a toast notification
 * 
 * Creates and dispatches a custom event that the Toast component listens for.
 * This decoupled approach allows any part of the application to show notifications
 * without direct component coupling.
 * 
 * @param {string} message - The message to display in the toast
 * @param {string} [type='success'] - The type of toast notification
 *   - 'success': Green background for positive actions
 *   - 'error': Red background for error messages
 *   - Additional types can be added by extending the Toast component
 * 
 * @example
 * // Show a success message
 * showToast('Data saved successfully!', 'success');
 * 
 * @example
 * // Show an error message
 * showToast('Failed to save data', 'error');
 * 
 * @example
 * // Show a success message (default type)
 * showToast('Operation completed!');
 */
export const showToast = (message, type = 'success') => {
  // Create a custom event with toast details in the event payload
  const event = new CustomEvent('show-toast', {
    detail: { message, type }
  });
  
  // Dispatch the event globally so the Toast component can listen for it
  window.dispatchEvent(event);
};
