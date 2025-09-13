/**
 * Header Component
 * 
 * A reusable header component that displays the page title and user profile information.
 * Used across different views to provide consistent top-level navigation and user context.
 * 
 * Features:
 * - Dynamic page title support
 * - User profile display with avatar and role
 * - Notification bell with indicator
 * - Responsive design
 * - Avatar integration with pravatar.cc service
 * 
 * Props:
 * - title: String - The page title to display (defaults to "College Profile Management")
 * - user: Object - User information containing name, role, and avatar
 * 
 * Design Notes:
 * - Uses pravatar.cc for avatar generation (consider user upload functionality)
 * - Notification bell is currently decorative (can be made functional)
 * - User data has fallback defaults for robustness
 * 
 * @component
 * @author College Portal Team
 * @version 1.0.0
 */

/**
 * Header Component
 * 
 * Renders the top header bar with title and user information.
 * Provides consistent header experience across different views.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title="College Profile Management"] - Page title to display
 * @param {Object} [props.user] - User information object
 * @param {string} [props.user.name] - User's display name
 * @param {string} [props.user.role] - User's role/title
 * @param {string} [props.user.avatar] - User's avatar URL
 * @returns {JSX.Element} Header component with title and user profile
 */
const Header = ({ title = "College Profile Management", user }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Page Title Section */}
      <h1 className="text-xl font-semibold text-gray-800">
        {title}
      </h1>
      
      {/* User Profile Section */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        <div className="relative">
          <div 
            className="w-6 h-6 text-gray-600 cursor-pointer hover:text-primary transition-colors"
            role="button"
            tabIndex={0}
            aria-label="View notifications"
            // TODO: Add onClick handler for notification functionality
            // TODO: Add keyboard event handler for accessibility
          >
            🔔
          </div>
          {/* Notification Indicator Dot */}
          {/* TODO: Make this dynamic based on actual notification count */}
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            aria-label="You have new notifications"
          ></div>
        </div>
        
        {/* User Information */}
        <div className="text-right">
          {/* User Name */}
          <div className="text-sm font-medium text-gray-900">
            {user?.name || "John gates"} {/* Fallback to default name */}
          </div>
          {/* User Role */}
          <div className="text-xs text-gray-500">
            {user?.role || "Institute admin"} {/* Fallback to default role */}
          </div>
        </div>
        
        {/* User Avatar */}
        <img
          src={user?.avatar || "https://i.pravatar.cc/40?img=1"} // Fallback to pravatar service
          alt={`${user?.name || "User"} avatar`}
          className="w-10 h-10 rounded-full border border-gray-200"
          style={{ width: '40px', height: '40px' }}
          loading="lazy" // Optimize image loading
          // TODO: Add error handling for failed avatar loads
          // TODO: Consider implementing user avatar upload functionality
        />
      </div>
    </div>
  );
};

export default Header;