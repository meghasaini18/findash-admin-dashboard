# FinDash Admin Dashboard

A responsive admin dashboard built with HTML, CSS, and vanilla JavaScript.

FinDash is a frontend dashboard project focused on building real-world UI interactions and practicing how static HTML/CSS interfaces can be transformed into dynamic web applications using JavaScript.

## 🚀 Live Demo

[View Live Demo](#)


## ✨ Features

### Dashboard

- Responsive admin dashboard layout
- Summary cards for:
  - Active Users
  - Pending Tasks
  - Total Projects
  - Revenue
- Dynamic dashboard card data using JavaScript
- Dynamic growth percentage
- Dynamic growth direction
- Responsive activity table

### Navigation

- Desktop sidebar navigation
- Responsive mobile sidebar
- Hamburger menu
- Overlay when mobile navigation is open
- Active navigation state
- Sidebar automatically closes when navigating on mobile
- Sidebar automatically closes when the browser is resized to desktop width

### Profile Menu

- Profile dropdown menu
- Open/close interaction
- Click-outside detection
- Escape-key support
- Focus management
- Accessible ARIA attributes

### Search

- Search activity table in real time
- Searches across table row content
- Case-insensitive search
- Automatically hides rows that don't match
- Displays a "No results found" state when there are no matches

### Activity Table

- User/activity information
- Status indicators
- Completed, Pending, and In Progress states
- View, Edit, and Delete action buttons
- Responsive horizontal scrolling on smaller screens

### Accessibility

- Semantic HTML elements
- Accessible button labels
- `aria-expanded`
- `aria-controls`
- `aria-haspopup`
- `aria-hidden`
- Keyboard support for the profile menu
- Visible keyboard focus states

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- Font Awesome

## 📁 Project Structure

```text
FinDash/
│
├── assets/
│   └── images/
│       └── logo.png
│
├── index.html
├── style.css
├── script.js
└── README.md

🎯 Project Goals

The main goal of this project was not simply to create a visually appealing dashboard.

The project was built to practice:

Writing semantic HTML
Creating scalable CSS
Building responsive layouts
Organizing CSS with custom properties
Using Flexbox and CSS Grid appropriately
Manipulating the DOM with JavaScript
Connecting HTML data attributes with JavaScript objects
Building reusable JavaScript functions
Creating real UI interactions
Handling user events
Thinking about accessibility
Turning a static interface into an interactive dashboard

🚧 Current Limitations

This is currently a frontend-only project.

The dashboard data is stored locally in JavaScript:

const dashboardData = {};

There is currently no:

Backend
Database
Authentication system
API
Persistent data storage

The project is therefore intended primarily as a frontend development and JavaScript practice project.

🧪 How to Run Locally

1. Clone the repository
git clone https://github.com/meghasaini18/findash-admin-dashboard.git

2. Open the project

Navigate into the project directory:

cd FinDash

3. Run the project

Open index.html in your browser.

For the best development experience, use the Live Server extension in VS Code.

📌 What I Learned

Through this project, I practiced moving from a static webpage toward a more realistic frontend application.

One of the most important concepts was separating data from presentation.

Instead of manually changing every dashboard card, the JavaScript data object controls the displayed values:

const dashboardData = {
    activeUsers: {
        value: 643,
        growth: 55,
        direction: "up"
    }
};

The HTML provides the structure, while JavaScript provides the behavior and data.

This approach makes the dashboard easier to maintain and provides a foundation for eventually replacing static data with API responses.

👤 Author

Megha Saini

Frontend Developer in progress.

This project is part of my hands-on frontend development journey, with a focus on building projects and learning JavaScript through practical implementation.

📄 License

This project is available for learning and personal portfolio purposes.


👤 Author

Megha Saini

Frontend Developer in progress.

This project is part of my hands-on frontend development journey, with a focus on building projects and learning JavaScript through practical implementation.

📄 License

This project is available for learning and personal portfolio purposes.
