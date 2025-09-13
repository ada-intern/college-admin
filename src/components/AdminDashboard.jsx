import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TurndownService from 'turndown';
import CollegeSelector from './CollegeSelector';
import Tabs from './Tabs';
import { getCollegeById, updateCollegeData, TABS_CONFIG } from '../data';

const turndownService = new TurndownService();

const AdminDashboard = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'));
  const [editorData, setEditorData] = useState('');
  const [collegeData, setCollegeData] = useState(null);

  useEffect(() => {
    if (selectedCollege) {
      const data = getCollegeById(selectedCollege);
      setCollegeData(data);
      setEditorData(data.tabs[activeTab]?.html || '');
    } else {
      setCollegeData(null);
      setEditorData('');
    }
  }, [selectedCollege, activeTab]);

  const handleSave = () => {
    const plaintext = new DOMParser().parseFromString(editorData, 'text/html').body.textContent || '';
    const markdown = turndownService.turndown(editorData);

    updateCollegeData(selectedCollege, activeTab, {
      html: editorData,
      plaintext,
      markdown
    });

    alert('Content saved!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <CollegeSelector selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege} />

      {selectedCollege && collegeData && (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4">
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;