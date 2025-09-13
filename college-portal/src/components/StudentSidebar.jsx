/**
 * Student Sidebar Component
 * 
 * A specialized sidebar component for the student view that displays:
 * - Top recruiting companies with logos
 * - Detailed scholarship and financial aid information
 * - Contact information with map integration
 * 
 * This component provides additional context and resources for students
 * viewing college information, enhancing the overall user experience
 * with relevant supplementary data.
 * 
 * Features:
 * - Company logos from external sources (Unsplash)
 * - Comprehensive financial aid statistics
 * - Contact information display
 * - Map integration button (placeholder)
 * - Responsive grid layout
 * 
 * Data Sources:
 * - Company logos: External Unsplash URLs with proper attribution
 * - Financial data: Hardcoded statistics (consider making dynamic)
 * - Contact info: Static data (consider making configurable)
 * 
 * @component
 * @author College Portal Team
 * @version 1.0.0
 */

/**
 * StudentSidebar Component
 * 
 * Renders the sidebar content for student view with recruiting companies,
 * financial aid information, and contact details.
 * 
 * @returns {JSX.Element} Complete sidebar with multiple information sections
 */
const StudentSidebar = () => {
  // Top recruiting companies configuration
  // TODO: Consider moving this to a configuration file or API
  // TODO: Add error handling for failed image loads
  const recruiters = [
    {
      name: "Google",
      logo: "https://images.unsplash.com/photo-1662057168154-89300791ad6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxnb29nbGUlMjBsb2dvJTIwY29tcGFueXxlbnwwfDB8fHwxNzU3NzYwMDcxfDA&ixlib=rb-4.1.0&q=85",
      attribution: "Rubaitul Azad on Unsplash"
    },
    {
      name: "Amazon",
      logo: "https://images.unsplash.com/photo-1620204792746-b96abcaaee3d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxhbWF6b24lMjBsb2dvJTIwY29tcGFueXxlbnwwfDB8fHwxNzU3NzYwMDcyfDA&ixlib=rb-4.1.0&q=85",
      attribution: "Brett Jordan on Unsplash"
    },
    {
      name: "Honeywell",
      logo: "https://images.unsplash.com/photo-1701534979355-7c03953df1bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxob25leXdlbGwlMjBsb2dvJTIwY29tcGFueXxlbnwwfDB8fHwxNzU3NzYwMDcyfDA&ixlib=rb-4.1.0&q=85",
      attribution: "Bernd Dittrich on Unsplash"
    },
    {
      name: "Ford",
      logo: "https://images.unsplash.com/photo-1705662188476-9d2da8539b41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxmb3JkJTIwbG9nbyUyMGNvbXBhbnl8ZW58MHwwfHx8MTc1Nzc2MDA3Mnww&ixlib=rb-4.1.0&q=85",
      attribution: "Haberdoedas II on Unsplash"
    }
  ];

  return (
    <aside className="space-y-6">
      {/* Top Recruiters Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="font-semibold text-gray-700 mb-4">
          Our Top Recruiters
        </h2>
        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 gap-4">
          {recruiters.map((recruiter) => (
            <img
              key={recruiter.name}
              src={recruiter.logo}
              alt={`${recruiter.name} logo - ${recruiter.attribution}`}
              className="h-10 object-contain"
              style={{ width: 'auto', height: '40px' }}
              loading="lazy" // Optimize image loading
              // TODO: Add error handling for failed image loads
              // TODO: Consider adding click handlers for company information
            />
          ))}
        </div>
      </div>

      {/* Scholarships & Financial Aid Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="font-semibold text-gray-700 mb-4">
          Scholarships & Financial Aid
        </h2>
        
        {/* Need-Based Aid Information */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">
            Need-Based Aid (No Merit-Based Scholarships)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            MIT provides 100% of demonstrated financial aid for domestic and international undergraduates, 
            determined via CSS Profile and MIT's own forms. Only need-based aid, no merit or athletic scholarships are offered.
          </p>
        </div>

        {/* Financial Aid Statistics */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Financial Aid Statistics</h3>
          {/* Statistics Grid */}
          {/* TODO: Consider making this data dynamic from API or config */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Students receiving aid</span>
              <span className="font-medium">58% of undergraduates</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Annual MIT Scholarship</span>
              <span className="font-medium">$50,000+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Students with full tuition covered</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total aid awarded annually</span>
              <span className="font-medium">$180 million</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Contact Information</h3>
          {/* Contact Details */}
          {/* TODO: Consider making this data configurable per college */}
          <div className="space-y-1 text-sm text-gray-600">
            <p><strong>Phone:</strong> +1 617-253-1000</p>
            <p><strong>Admission Office:</strong> +1 617-253-3400</p>
            <p><strong>Email:</strong> admissions@mit.edu</p>
            <p><strong>Address:</strong></p>
            <p>77 Massachusetts Avenue</p>
            <p>Cambridge, MA 02139</p>
            <p>United States</p>
          </div>
        </div>

        {/* Map Integration Button */}
        <button 
          className="w-full mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-hover transition-colors"
          onClick={() => {
            // TODO: Implement map integration
            // Options: Google Maps embed, external map link, or modal with map
            console.log('Map integration not implemented yet');
          }}
          aria-label="View college location on map"
        >
          View on Map
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;