import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import CollegeSelector from './CollegeSelector';
import Tabs from './Tabs';
import { getCollegeById, TABS_CONFIG } from '../data';

const StudentView = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'));
  const [collegeData, setCollegeData] = useState(null);
  const [renderMode, setRenderMode] = useState('html'); // 'html', 'plaintext', 'markdown'

  useEffect(() => {
    if (selectedCollege) {
      setCollegeData(getCollegeById(selectedCollege));
    } else {
      setCollegeData(null);
    }
  }, [selectedCollege]);

  const renderContent = () => {
    if (!collegeData) return null;

    const content = collegeData.tabs[activeTab];
    if (!content) return <p>No content available for this tab.</p>;

    switch (renderMode) {
      case 'plaintext':
        return <pre>{content.plaintext}</pre>;
      case 'markdown':
        return <ReactMarkdown>{content.markdown}</ReactMarkdown>;
      case 'html':
      default:
        return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.html) }} />;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student View</h1>
      <CollegeSelector selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege} />

      {selectedCollege && collegeData && (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4">
            <div className="flex justify-end mb-4">
              <span className="text-sm font-medium text-gray-700 mr-2">Render Mode:</span>
              <button onClick={() => setRenderMode('html')} className={`px-2 py-1 text-sm rounded ${renderMode === 'html' ? 'bg-indigo-100 text-indigo-700' : ''}`}>HTML</button>
              <button onClick={() => setRenderMode('plaintext')} className={`ml-2 px-2 py-1 text-sm rounded ${renderMode === 'plaintext' ? 'bg-indigo-100 text-indigo-700' : ''}`}>Plaintext</button>
              <button onClick={() => setRenderMode('markdown')} className={`ml-2 px-2 py-1 text-sm rounded ${renderMode === 'markdown' ? 'bg-indigo-100 text-indigo-700' : ''}`}>Markdown</button>
            </div>
            <div className="p-4 border rounded bg-white">
              {renderContent()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentView;