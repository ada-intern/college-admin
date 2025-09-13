# College Portal

A React application that simulates a college portal with an admin view for editing content with CKEditor 5 and a student view for consuming the content.

## Features

- **Admin View**: Allows administrators to select a college and edit content for various tabs using CKEditor 5.
- **Student View**: Allows students to select a college and view the content in a sanitized HTML, plaintext, or Markdown format.
- **LocalStorage**: All data is stored in the browser's localStorage.
- **Styling**: The application is styled with Tailwind CSS.

## Project Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd college-portal
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Components

- **`App.jsx`**: The main component that handles view switching between the admin and student dashboards.
- **`AdminDashboard.jsx`**: The component for the admin view, which includes the CKEditor instance for content editing.
- **`StudentView.jsx`**: The component for the student view, which displays the content and allows for format switching.
- **`CollegeSelector.jsx`**: A shared component for selecting a college.
- **`Tabs.jsx`**: A shared component for navigating between the different content tabs.

## Data Model

The application uses a simple data model stored in `localStorage`. The data is seeded from `src/data.js` when the application first loads. The structure is as follows:

```json
{
  "colleges": {
    "1": {
      "name": "ABC Institute",
      "tabs": {
        "courses": {
          "html": "<p>B.Tech in CS...</p>",
          "plaintext": "B.Tech in CS...",
          "markdown": "**B.Tech** in CS..."
        },
        ...
      }
    },
    ...
  }
}
