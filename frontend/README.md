# Finance App Frontend
This is the React frontend for the Finance App—a tool to upload bank or UPI PDF statements, visualize, edit, and categorize expenses using AI.

## Features
- Upload PDF bank statements or UPI transaction files.
- View all extracted expenses in a table.
- Edit expense details.
- AI-powered automatic categorization of expenses.
- Manual category assignment.

## Prerequisites
Node.js (recommended: v18+)
npm (comes with Node.js)

## Running Locally
Install dependencies:
npm install
Start the development server:
npm start

This will launch the app at http://localhost:3000
(Make sure your backend is running at http://localhost:8000.)

Build for Production
npm run build
Static files will be generated in the build/ directory.

## Environment Variables
Normally, the API base URL is set in src/api.js as:

const API_BASE = 'http://localhost:8000';
Edit this if your backend runs elsewhere.

## Using with Docker
The frontend can be run as a Docker container, orchestrated with the backend using docker-compose.yml from your project root.
To build and run containers:
docker-compose up --build

## Customization
To add new expense categories, edit the categories array in ExpensesTable.js.
You can customize styles or UI components freely.

## Available Scripts
npm start — Start development server
npm run build — Build for production
npm test — Run tests (if you add them)

## Troubleshooting
- CORS Errors?
Make sure the backend (http://localhost:8000) has CORS enabled (FastAPI makes this easy).

- API Connectivity Issues?
Verify that backend and frontend are running, and check the API base URL in src/api.js.
