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

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TurndownService from "turndown";
import CollegeSelector from "./CollegeSelector";
import Tabs from "./Tabs";
import { getCollegeById, updateCollegeData, TABS_CONFIG } from "../data";
import { showToast } from "./toastUtils";
import UploadAdapter from './uploadAdapter';

/**
 * CKEditor Upload Plugin Configuration
 * 
 * Configures the file repository to use our custom upload adapter
 * for handling image uploads within the editor.
 * 
 * @param {Object} editor - CKEditor instance
 */
function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}

// Initialize TurndownService for converting HTML content to Markdown format
const turndownService = new TurndownService();

/**
 * AdminDashboard Component
 * 
 * Main administrative interface for college content management.
 * Handles college selection, tab navigation, content editing, and saving.
 * 
 * @returns {JSX.Element} The complete admin dashboard interface
 */
const AdminDashboard = () => {
  // State for tracking which college is currently selected for editing
  const [selectedCollege, setSelectedCollege] = useState("");
  
  // State for tracking the active tab/section being edited
  // Default to first tab, converted to lowercase with spaces/ampersands replaced with underscores
  const [activeTab, setActiveTab] = useState(
    TABS_CONFIG[0].toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")
  );
  
  // State for storing the current editor content (HTML format)
  const [editorData, setEditorData] = useState("");
  
  // State for storing the complete college data object
  const [collegeData, setCollegeData] = useState(null);

  /**
   * Effect hook to load college data when selection or active tab changes
   * 
   * This effect runs whenever selectedCollege or activeTab changes and:
   * - Fetches the college data from localStorage
   * - Updates the editor with the content for the active tab
   * - Resets data when no college is selected
   */
  useEffect(() => {
    if (selectedCollege) {
      // Fetch college data from localStorage via data.js
      const data = getCollegeById(selectedCollege);
      setCollegeData(data);
      
      // Load the HTML content for the active tab, fallback to empty string if no content exists
      setEditorData(data.tabs[activeTab]?.html || "");
    } else {
      // Reset state when no college is selected
      setCollegeData(null);
      setEditorData("");
    }
  }, [selectedCollege, activeTab]);

  /**
   * Handles saving the current editor content
   * 
   * This function:
   * 1. Validates that a college is selected
   * 2. Converts HTML to plaintext using DOM parser
   * 3. Converts HTML to markdown using TurndownService
   * 4. Saves all three formats to localStorage
   * 5. Shows success notification
   */
  const handleSave = () => {
    // Early return if no college is selected
    if (!selectedCollege) return;
    
    // Convert HTML to plaintext by parsing DOM and extracting text content
    const plaintext =
      new DOMParser().parseFromString(editorData, "text/html").body
        .textContent || "";
    
    // Convert HTML to markdown format for alternative storage/display
    const markdown = turndownService.turndown(editorData);

    // Save all three formats (HTML, plaintext, markdown) to localStorage
    updateCollegeData(selectedCollege, activeTab, {
      html: editorData,
      plaintext,
      markdown,
    });

    // Show success notification to user
    showToast("Content saved successfully!", "success");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <div className="flex items-center space-x-2 mb-8">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-lg font-bold text-indigo-600">Career Yatra</span>
        </div>
        <nav className="space-y-3">
          {["Dashboard", "Leads", "College Profile", "Offered Courses", "Study Material", "Webinars & Events"].map((item, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                item === "College Profile"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            College Profile Management
          </h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">John Gates</span>
            <img
              src="/avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </div>

        {/* Selector + Tabs */}
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-4">
            Update your college information. Changes will be reviewed by Admin before publishing.
          </p>

          <CollegeSelector
            selectedCollege={selectedCollege}
            setSelectedCollege={setSelectedCollege}
          />  

          {selectedCollege && collegeData && (
            <div className="mt-6">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* CKEditor */}
              <div className="mt-4 border rounded-md overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={editorData}
                  onChange={(event, editor) => setEditorData(editor.getData())}
                  config={{
                    extraPlugins: [uploadPlugin],
                    toolbar: ['heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', '|', 'insertTable', 'blockQuote', '|', 'uploadImage', 'mediaEmbed', '|', 'undo', 'redo'],
                    image: {
                      toolbar: ['imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|', 'toggleImageCaption', 'imageTextAlternative', '|', 'linkImage'],
                      upload: {
                        types: ['jpeg', 'png', 'gif', 'jpg'],
                      }
                    },
                    mediaEmbed: {
                      previewsInData: true
                    },
                    table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                    }
                  }}
                  onError={(error, { willEditorRestart }) => {
                    if (willEditorRestart) {
                      console.warn('Editor will be restarted');
                    }
                    console.error(error);
                  }}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
