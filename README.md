# Ilera  A Simple Health Tracker Application

A single-page React web application that allows users to track their medications and log daily vital signs. Built with React functional components and hooks, featuring user authentication and persistent data storage using localStorage.

## Features

### 1. Medication Management
- **Add Medication**: Form to add new medications with name, dosage, and frequency
- **View Medications**: Display all medications in a clean, organized list
- **Remove Medication**: Delete medications with a single click

### 2. Vital Signs Logging
- **Log Vitals**: Record blood pressure (systolic/diastolic), heart rate, and weight
- **View History**: Chronological log of all vital sign entries (newest first)
- **Automatic Timestamps**: Each entry includes the date and time it was logged

### 3. User Authentication
- **Simple Login**: Username-based authentication (no password required)
- **User-Specific Data**: Each user's medications and vitals are stored separately
- **Logout**: Manual logout button
- **Auto-Logout**: Automatic logout after 10 minutes of inactivity

## Technical Stack

- **React 19.2.3**: Functional components with hooks (useState, useEffect)
- **LocalStorage**: Persistent data storage per user
- **CSS3**: Modern, responsive styling
- **No External Dependencies**: Uses only built-in React state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ilera-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### Sample Credentials

For testing purposes, you can use any username. Examples:
- `john_doe`
- `jane_smith`
- `test_user`


**Note**: No password is required. Simply enter a username and click "Sign In".

### Adding Medications

1. Log in with your username
2. Fill out the "Add Medication" form:
   - Medication Name (e.g., "Lisinopril")
   - Dosage (e.g., "20mg")
   - Frequency (e.g., "Once daily in the morning")
3. Click "Add Medication" button.
4. The medication will appear in your medication list below

### Removing Medications

1. Find the medication in your list
2. Click the red "Trash" icon next to the medication
3. A confirmation Modal will popup for the user to Remove or cancel 
3. If the user clicks "Remove" button, the medication will be immediately removed, else the medication remains. 


### Logging Vital Signs

1. Fill out the "Log Vital Signs" form:
   - Blood Pressure (Systolic) - e.g., 120
   - Blood Pressure (Diastolic) - e.g., 80
   - Heart Rate (BPM) - e.g., 65
   - Weight (Kg) - e.g., 150 (It should not be more that 400kg of less than 20kg)
   - All input fields are required and an error message is notified to the user on any missing input value.
2. Click "Log Vitals"
3. The entry will appear at the top of your vital signs history

### Viewing History

- All vital sign entries are displayed in reverse chronological order (newest first)
- Each entry shows the timestamp, blood pressure, heart rate, and weight
- On the Dashboard the latest entry is displayed for the user

### Logging Out

- Click the "Logout" button in the sidebar
- You will be returned to the login screen
- Your data will be saved and available when you log back in

### Auto-Logout

- The application automatically logs you out after 10 minutes of inactivity
- Activity includes: mouse movement, clicks, keyboard input, scrolling, and touch events
- You'll receive an alert when auto-logout occurs

## Project Structure

```
ILERA-APP/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   │   └── # Static assets (images, icons, fonts)
│   │
│   ├── common/
│   │   └── # Shared utilities, constants, or helpers
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Auth.js              # Authentication wrapper / logic
│   │   │   ├── AuthTabs.js          # Login / Signup tab navigation
│   │   │   ├── Login.js             # Login form component
│   │   │   ├── Signup.js            # Signup form component
│   │   │   ├── FormGroup.js         # Reusable form input group
│   │   │   ├── ErrorMessage.js      # Form validation error display
│   │   │   └── AuthForm.css         # Authentication styles
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.js         # Main dashboard view
│   │   │   └── Dashboard.css        # Dashboard styles
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.js           # App navigation sidebar
│   │   │   └── Sidebar.css          # Sidebar styles
│   │   │
│   │   ├── medications/
│   │   │   ├── MedicationForm.js    # Add medication form
│   │   │   ├── MedicationList.js    # Medication list display
│   │   │   ├── MedicationForm.css   # Medication form styles
│   │   │   └── MedicationList.css   # Medication list styles
│   │   │
│   │   ├── vitals/
│   │   │   ├── VitalsForm.js        # Log vital signs form
│   │   │   ├── VitalsLog.js         # Vitals history log
│   │   │   ├── VitalsForm.css       # Vitals form styles
│   │   │   └── VitalsLog.css        # Vitals log styles
│   │   │
│   │   └── settings/
│   │       └── # User or app settings components
│   ├── utils/
│   │   └── storage.js
│   ├── App.js                      # Root application component
│   ├── index.js                     # Application entry point
│   └── index.css                    # Global styles
│
├── package.json
└── README.md

```

## Component Architecture

The application is built with a component-based architecture:

- **Login**: Handles user authentication
- **MedicationForm**: Form for adding new medications
- **MedicationList**: Displays and manages the medication list
- **VitalsForm**: Form for logging vital signs
- **VitalsLog**: Displays the history of vital sign entries
- **App**: Main component that manages state and coordinates all features

## Data Storage

All data is stored in the browser's localStorage with user-specific keys:
- Medications: `medications-{username}`
- Vitals: `vitals-{username}`
- Current User: `currentUser`

Data persists across browser sessions and page refreshes.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing

Run the test suite:
```bash
npm test
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)


## Author
- Nneoma Onuoha.
