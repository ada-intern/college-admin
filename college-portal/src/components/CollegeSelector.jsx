import { getColleges } from '../data';

const CollegeSelector = ({ selectedCollege, setSelectedCollege }) => {
  const colleges = getColleges();

  return (
    <div className="mb-4">
      <label htmlFor="college-select" className="block text-sm font-medium text-gray-700">
        Select a College
      </label>
      <select
        id="college-select"
        value={selectedCollege}
        onChange={(e) => setSelectedCollege(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">-- Select a College --</option>
        {Object.entries(colleges).map(([id, { name }]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CollegeSelector;
