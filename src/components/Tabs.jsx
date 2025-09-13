import { TABS_CONFIG } from '../data';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {TABS_CONFIG.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}
            className={`${
              activeTab === tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;