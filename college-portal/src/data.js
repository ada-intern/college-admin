const TABS = [
  'Courses',
  'Admission Process',
  'Placements',
  'Scholarships',
  'Hostel & Campus',
  'Rankings',
  'Gallery',
  'Cut-offs',
  'Work while studying'
];

const COLLEGES = {
  1: {
    name: 'ABC Institute',
    tabs: TABS.reduce((acc, tab) => {
      acc[tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')] = {
        html: `<p>Content for ${tab}</p>`,
        plaintext: `Content for ${tab}`,
        markdown: `Content for **${tab}**`
      };
      return acc;
    }, {})
  },
  2: {
    name: 'XYZ College',
    tabs: TABS.reduce((acc, tab) => {
      acc[tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')] = {
        html: `<p>Details about ${tab}</p>`,
        plaintext: `Details about ${tab}`,
        markdown: `Details about **${tab}**`
      };
      return acc;
    }, {})
  }
};

export const initializeData = () => {
  if (!localStorage.getItem('colleges')) {
    localStorage.setItem('colleges', JSON.stringify(COLLEGES));
  }
};

export const getColleges = () => {
  return JSON.parse(localStorage.getItem('colleges')) || {};
};

export const getCollegeById = (id) => {
  const colleges = getColleges();
  return colleges[id];
};

export const updateCollegeData = (id, tab, data) => {
  const colleges = getColleges();
  if (colleges[id]) {
    colleges[id].tabs[tab] = data;
    localStorage.setItem('colleges', JSON.stringify(colleges));
  }
};

export const TABS_CONFIG = TABS;
