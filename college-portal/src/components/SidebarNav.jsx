/**
 * Sidebar Navigation Component
 * 
 * A reusable sidebar navigation component that displays the Career Yatra logo
 * and a list of navigation menu items. Currently used in the AdminDashboard
 * to provide easy access to different sections of the portal.
 * 
 * Features:
 * - Company logo with external image URL
 * - Navigation menu with active state highlighting
 * - Responsive design (hidden on mobile, visible on desktop)
 * - Hover effects for better user experience
 * - Emoji icons as placeholders (can be replaced with icon library)
 * 
 * Design Notes:
 * - Uses external Unsplash image for logo (consider hosting locally for production)
 * - Active state is hardcoded for "College Profile" (can be made dynamic)
 * - Emoji icons are used as temporary solution (recommend icon library integration)
 * 
 * @component
 * @author College Portal Team
 * @version 1.0.0
 */

/**
 * SidebarNav Component
 * 
 * Renders the sidebar navigation with logo and menu items.
 * The component is stateless and uses hardcoded navigation items.
 * 
 * @returns {JSX.Element} Sidebar navigation component
 */
const SidebarNav = () => {
  // Navigation menu configuration
  // TODO: Consider moving this to a separate config file for easier maintenance
  // TODO: Make active state dynamic based on current route/section
  const navigationItems = [
    { name: "Dashboard", icon: "📊", active: false },
    { name: "Leads", icon: "👥", active: false },
    { name: "College Profile", icon: "🏛️", active: true }, // Currently active section
    { name: "Offered Courses", icon: "📚", active: false },
    { name: "Study Material", icon: "📄", active: false },
    { name: "Webinars & Events", icon: "🎥", active: false }
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 mb-8">
        {/* Company Logo */}
        {/* Note: Using external Unsplash image - consider hosting locally for production */}
        <img 
          src="https://images.unsplash.com/photo-1633544325196-bcf8bf81ead0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxsb2dvJTIwbGV0dGVycyUyMENZJTIwY29tcGFueXxlbnwwfDJ8fGJsdWV8MTc1Nzc2MDA3MXww&ixlib=rb-4.1.0&q=85" 
          alt="Career Yatra logo - Javier Esteban on Unsplash" 
          className="w-10 h-10 object-contain"
          style={{ width: '40px', height: '40px' }}
          loading="lazy" // Optimize image loading
        />
        <span className="text-lg font-bold text-primary">Career Yatra</span>
      </div>
      
      {/* Navigation Menu */}
      <nav className="space-y-3" role="navigation" aria-label="Main navigation">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              item.active
                ? "bg-primary text-white" // Active state styling
                : "text-gray-700 hover:bg-gray-100" // Inactive state with hover effect
            }`}
            role="button"
            tabIndex={0} // Make keyboard accessible
            aria-label={`Navigate to ${item.name}`}
            // TODO: Add onClick handler for navigation functionality
            // TODO: Add keyboard event handler for accessibility
          >
            <span className="mr-3" aria-hidden="true">{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNav;