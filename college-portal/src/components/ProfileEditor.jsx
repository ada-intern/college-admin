/**
 * Profile Editor Component
 * 
 * The main content editing interface for college profile management.
 * Integrates CKEditor 5 for rich text editing with custom upload adapter,
 * college selection, and tabbed content organization.
 * 
 * Key Features:
 * - CKEditor 5 integration with custom toolbar
 * - Image upload support via custom adapter
 * - College selection dropdown
 * - Tabbed content navigation
 * - Auto-save functionality with multiple format conversion
 * - Toast notifications for user feedback
 * - Responsive design with dynamic width
 * 
 * Data Flow:
 * 1. User selects college -> loads college data from localStorage
 * 2. User selects tab -> loads tab-specific content
 * 3. User edits content -> updates local state
 * 4. User saves -> converts to multiple formats and persists to localStorage
 * 
 * Dependencies:
 * - CKEditor 5 for rich text editing
 * - TurndownService for HTML to Markdown conversion
 * - Custom UploadAdapter for image handling
 * 
 * @component
 * @author College Portal Team
 * @version 1.0.0
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
 * Configures CKEditor to use our custom upload adapter for handling
 * image uploads. This allows images to be processed and stored according
 * to our application's requirements.
 * 
 * @param {Object} editor - CKEditor instance
 */
function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}

// Initialize TurndownService for HTML to Markdown conversion
// Used when saving content to provide multiple format options
const turndownService = new TurndownService();

/**
 * ProfileEditor Component
 * 
 * Main editing interface that handles college selection, tab navigation,
 * content editing, and saving operations.
 * 
 * State Management:
 * - selectedCollege: Currently selected college ID
 * - activeTab: Currently active content tab
 * - editorData: Current editor content (HTML format)
 * - collegeData: Complete college data object
 * 
 * @returns {JSX.Element} Complete profile editing interface
 */
const ProfileEditor = () => {
  // State for tracking which college is currently selected for editing
  const [selectedCollege, setSelectedCollege] = useState("");
  
  // State for tracking the active tab/section being edited
  // Defaults to first tab with proper formatting (spaces -> underscores)
  const [activeTab, setActiveTab] = useState(
    TABS_CONFIG[0].toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")
  );
  
  // State for storing the current editor content in HTML format
  const [editorData, setEditorData] = useState("");
  
  // State for storing the complete college data object
  const [collegeData, setCollegeData] = useState(null);

  /**
   * Effect: Load college data when selection or active tab changes
   * 
   * Triggers when:
   * - User selects a different college
   * - User switches to a different tab
   * 
   * Actions:
   * - Fetches college data from localStorage
   * - Loads tab-specific content into editor
   * - Resets state when no college is selected
   */
  useEffect(() => {
    if (selectedCollege) {
      // Fetch college data from localStorage via data.js helper
      const data = getCollegeById(selectedCollege);
      setCollegeData(data);
      
      // Load HTML content for the active tab, with fallback to empty string
      setEditorData(data.tabs[activeTab]?.html || "");
    } else {
      // Reset state when no college is selected
      setCollegeData(null);
      setEditorData("");
    }
  }, [selectedCollege, activeTab]); // Dependencies: re-run when these values change

  /**
   * Handle Save Operation
   * 
   * Processes the current editor content and saves it in multiple formats:
   * 1. HTML - Original rich text format from CKEditor
   * 2. Plain text - Extracted text content for search/indexing
   * 3. Markdown - Converted format for alternative display
   * 
   * Also triggers success notification via toast system.
   */
  const handleSave = () => {
    // Early return if no college is selected
    if (!selectedCollege) return;
    
    // Convert HTML to plain text using DOM parser
    // This extracts just the text content, removing all HTML tags
    const plaintext =
      new DOMParser().parseFromString(editorData, "text/html").body
        .textContent || "";
    
    // Convert HTML to Markdown using TurndownService
    // Provides an alternative format for display or export
    const markdown = turndownService.turndown(editorData);

    // Save all three formats to localStorage
    updateCollegeData(selectedCollege, activeTab, {
      html: editorData,      // Rich text format
      plaintext,             // Plain text format
      markdown,              // Markdown format
    });

    // Show success notification to user
    showToast("Content saved successfully!", "success");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Instructions Text */}
      <p className="text-sm text-gray-500 mb-4">
        Update your college information. Changes will be reviewed by Admin before publishing.
      </p>

      {/* Tab Selection Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select the tab you want to update
        </label>
        <div className="text-sm text-gray-600 mb-4">Profile Tab</div>
      </div>

      {/* College Selection Dropdown */}
      <CollegeSelector
        selectedCollege={selectedCollege}
        setSelectedCollege={setSelectedCollege}
      />  

      {/* Editor Interface - Only shown when college is selected */}
      {selectedCollege && collegeData && (
        <div className="mt-6">
          {/* Tab Navigation */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* CKEditor Container */}
          {/* Note: Width is now dynamic (w-full) to follow outer container */}
          <div className="mt-4 border rounded-md overflow-hidden w-full">
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => setEditorData(editor.getData())}
              config={{
                // Custom plugins including our upload adapter
                extraPlugins: [uploadPlugin],
                
                // Toolbar configuration - customize as needed
                toolbar: [
                  'heading', '|', 
                  'bold', 'italic', 'link', '|', 
                  'bulletedList', 'numberedList', '|', 
                  'insertTable', 'blockQuote', '|', 
                  'uploadImage', 'mediaEmbed', '|', 
                  'undo', 'redo'
                ],
                
                // Image handling configuration
                image: {
                  toolbar: [
                    'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|', 
                    'toggleImageCaption', 'imageTextAlternative', '|', 
                    'linkImage'
                  ],
                  upload: {
                    types: ['jpeg', 'png', 'gif', 'jpg'], // Allowed file types
                  }
                },
                
                // Media embed configuration
                mediaEmbed: {
                  previewsInData: true // Show previews in editor
                },
                
                // Table functionality
                table: {
                  contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                }
              }}
              onError={(error, { willEditorRestart }) => {
                // Error handling for CKEditor issues
                if (willEditorRestart) {
                  console.warn('Editor will be restarted');
                }
                console.error('CKEditor error:', error);
                // TODO: Consider showing user-friendly error message
              }}
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-hover transition"
              disabled={!editorData.trim()} // Disable if no content
              // TODO: Add loading state during save operation
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditor;