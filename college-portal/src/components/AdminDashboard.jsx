/**
 * Admin Dashboard Component
 * 
 * This component provides the administrative interface for managing college information.
 * It integrates CKEditor 5 for rich text editing and allows admins to update college
 * content across different tabs/sections.
 * 
 * Key Features:
 * - College selection dropdown
 * - Tabbed interface for different content sections
 * - Rich text editor with image upload support
 * - Content saving with multiple format conversion (HTML, plaintext, markdown)
 * - Toast notifications for user feedback
 * - Responsive sidebar navigation
 * 
 * Dependencies:
 * - CKEditor 5 for rich text editing
 * - TurndownService for HTML to Markdown conversion
 * - Custom upload adapter for image handling
 * 
 * @component
 * @author College Portal Team
 */

import SidebarNav from "./SidebarNav";
import Header from "./Header";
import ProfileEditor from "./ProfileEditor";

/**
 * AdminDashboard Component
 * 
 * Main administrative interface for college content management.
 * Handles college selection, tab navigation, content editing, and saving.
 * 
 * @returns {JSX.Element} The complete admin dashboard interface
 */
const AdminDashboard = () => {

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 p-6">
        <Header />
        <ProfileEditor />
      </div>
    </div>
  );
};

export default AdminDashboard;