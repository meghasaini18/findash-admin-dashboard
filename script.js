const profileBtn = document.querySelector(".profile-btn");
const dropdown = document.querySelector(".dropdown");
const hamburger = document.querySelector(".hamburger-icon");
const sidebar = document.querySelector(".sidebar");
const navLinks = document.querySelectorAll(".navigation a");
const overlay = document.querySelector(".overlay");
const searchInput = document.querySelector(".dashboard-search");
const tableBody = document.querySelector("tbody");


//open dropdown
function openDropdown(element, button){
element.classList.replace("close", "open");
button.setAttribute("aria-expanded", "true");

//for focus on first child item
const firstMenuItem = element.querySelector("a");
firstMenuItem.focus();
}

//close dropdown
function closeDropdown(element, button){
if (button.getAttribute("aria-expanded") === "false") return;
element.classList.replace("open", "close");
button.setAttribute("aria-expanded", "false");

//for focus on btn
button.focus();
}

//function for toggle open close class
function toggleDropdown(element, button){
if(element.classList.contains("open")){
closeDropdown(element, button);
}
else{
openDropdown(element, button);
}
}

// for open and close dropdown
profileBtn.addEventListener("click",(e) =>{
e.stopPropagation();
toggleDropdown(dropdown, profileBtn);
});

// when click outside menu
document.addEventListener("click", (e) => {
if(!dropdown.contains(e.target) && !profileBtn.contains(e.target)){
closeDropdown(dropdown, profileBtn);
}
});

//esc key
document.addEventListener("keydown", (e) => {
if(e.key === "Escape"){
closeDropdown(dropdown, profileBtn);
}
})

//hamburger js
hamburger.addEventListener("click", () => {
const isOpen = sidebar.classList.toggle("mobile-open");
hamburger.classList.toggle("mobile-open", isOpen);
overlay.classList.toggle("active", isOpen);
hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
hamburger.setAttribute(
"aria-label",
isOpen ? "Close menu" : "Open menu"
);
})

function closeMobileMenu() {
sidebar.classList.remove("mobile-open");
hamburger.classList.remove("mobile-open");
hamburger.setAttribute("aria-expanded", "false");
hamburger.setAttribute("aria-label", "Open menu");
overlay.classList.remove("active");
}

//resize
window.addEventListener("resize", () => {
if (window.innerWidth > 991) {
closeMobileMenu();
}
});

//for active class on navigation
navLinks.forEach(link => {
link.addEventListener("click", () => {
navLinks.forEach(item => item.classList.remove("active"));
link.classList.add("active");

// link click
closeMobileMenu();
});
});

//overlay click
overlay.addEventListener("click", closeMobileMenu);

//dashboard data
const dashboardData = {
activeUsers: {
value: 643,
growth: 55,
direction: "up"
},
pendingTasks:{
value: 3475,
growth: 65,
direction: "up"
},
totalProjects:{
value: 345,
growth: 5,
direction: "down"
},
revenue:{
value: 464,
growth: 23,
direction: "up"
}
};

//card data
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    const cardType = card.dataset.card;
const dataKey = cardType
.split("-")
.map((value, index) =>{ 
if(index === 0){
    return value;
} 
return value[0].toUpperCase() + value.slice(1); 
})
.join("");
const cardData = dashboardData[dataKey];
if(!cardData){
console.error(`No dashboard data found for: ${dataKey}`);
return;
}
const numberElement = card.querySelector(".number"); 
const growthElement = card.querySelector(".growth-value");
const arrowElement = card.querySelector(".growth i");

if (!numberElement || !growthElement || !arrowElement) {
console.error(`Missing required elements in card: ${dataKey}`);
return;
}
//update value
numberElement.textContent = cardData.value;  
//update growth
growthElement.textContent = `${cardData.growth}%`;
//update direction
    arrowElement.classList.remove("fa-arrow-up", "fa-arrow-down");
arrowElement.classList.add(
cardData.direction === "up" ? "fa-arrow-up" : "fa-arrow-down"
);
})

//table data 
const activityData = [
{
id: 1,
name: "Aisha",
status: "Completed",
statusClass: "completed",
date: "Today",
action: "view"
},
{
id: 2,
name: "Rahul",
status: "Pending",
statusClass: "pending",
date: "Yesterday",
action: "edit"
},
{
id: 3,
name: "John",
status: "In Progress",
statusClass: "progress",
date: "Jun 12",
action: "delete"
},
{
id: 4,
name: "Emily",
status: "Completed",
statusClass: "completed",
date: "Jun 13",
action: "view"
}
];

//valid status
const validStatuses = [
"Completed",
"Pending",
"In Progress"
];

// Status Class

function getStatusClass(status) {

switch (status) {
case "Completed":
return "completed";

case "Pending":
return "pending";

case "In Progress":
return "progress";

default:
return "";
}
}

function renderActivityTable(data) {
tableBody.innerHTML = "";

// Show empty state when there is no data
if (data.length === 0) {
    const noResultRow = document.createElement("tr");
    noResultRow.classList.add("no-results-row");

    const tableCol = document.createElement("td");
    tableCol.textContent = "No results found";
    tableCol.colSpan = 4;
    
    noResultRow.appendChild(tableCol);
    tableBody.appendChild(noResultRow);

    return;
}

const actionLabels = {
            view: "View",
            edit: "Edit",
            delete: "Delete"
        };

data.forEach(activity => {

const row = document.createElement("tr");
row.classList.add("activity-row");
row.dataset.activityId = activity.id;
const nameCell = document.createElement("td");
const statusCell = document.createElement("td");
const dateCell = document.createElement("td");
const actionCell = document.createElement("td");


//create span for status
const statusSpan = document.createElement("span");
statusSpan.classList.add("status", activity.statusClass);
statusSpan.textContent = activity.status;

//button
const button = document.createElement("button");
button.classList.add("action-btn",
                    activity.action.toLowerCase() + "-btn");

button.setAttribute("type", "button");
button.setAttribute("data-action", activity.action);
button.textContent = actionLabels[activity.action];

nameCell.textContent = activity.name;

statusCell.appendChild(statusSpan);

dateCell.textContent = activity.date;

actionCell.appendChild(button);

const statusButton = document.createElement("button");
statusButton.classList.add("action-btn", "status-btn");
statusButton.setAttribute("type", "button");
statusButton.setAttribute("data-action", "status");
statusButton.textContent = "Change Status";

// Add both buttons
actionCell.appendChild(statusButton);

row.appendChild(nameCell);
row.appendChild(statusCell);
row.appendChild(dateCell);
row.appendChild(actionCell);

tableBody.append(row);
});
}

//search
function filterActivityTable() {
const searchTerm = searchInput.value.trim().toLowerCase();

const filteredData = activityData.filter(activity => {
return (
    activity.name.toLowerCase().includes(searchTerm) ||
    activity.status.toLowerCase().includes(searchTerm) ||
    activity.date.toLowerCase().includes(searchTerm) ||
    activity.action.toLowerCase().includes(searchTerm)
);
});

renderActivityTable(filteredData);
}

function refreshActivityTable() {
filterActivityTable();
}

searchInput.addEventListener("input", filterActivityTable);

renderActivityTable(activityData);

function viewActivity(activity) {
alert(
`Name: ${activity.name}\n` +
`Status: ${activity.status}\n` +
`Date: ${activity.date}`
);
}


function editActivity(activity) {
const newName = prompt(
"Enter new name:",
activity.name
);

// User clicked Cancel
if (newName === null) {
return;
}

const trimmedName = newName.trim();

// Don't allow empty name
if (trimmedName === "") {
alert("Name cannot be empty.");
return;
}

// Actually modify the activity
activity.name = trimmedName;

// Refresh table while keeping search
refreshActivityTable();
}


function deleteActivity(activity) {
const confirmed = confirm(
`Are you sure you want to delete ${activity.name}?`
);

// User clicked Cancel
if (!confirmed) {
return;
}

const index = activityData.findIndex(
item => item.id === activity.id
);

if (index === -1) {
return;
}

// Actually remove the activity
activityData.splice(index, 1);

// Refresh table while keeping search
refreshActivityTable();
}

//change status
function changeActivityStatus(activity) {

const newStatus =prompt("Enter status:\nCompleted / Pending / In Progress", activity.status);

// Cancel
if (newStatus === null) {
return;
}

const trimmedStatus =newStatus.trim();

// Validate status
if (!validStatuses.includes(trimmedStatus)) {
alert("Invalid status. Please choose: Completed, Pending, or In Progress.");
return;
}

// Modify activity
activity.status =trimmedStatus;

// Update visual class
activity.statusClass =getStatusClass(trimmedStatus);

// Refresh table
refreshActivityTable();
}

tableBody.addEventListener("click", (e) => {
const button = e.target.closest(".action-btn");
if(!button){
return;
}
const row = button.closest(".activity-row");
if (!row) {
return;
}

const activityId = Number(row.dataset.activityId);
console.log("Activity ID:", activityId);

const activity = activityData.find(
activity => activity.id === activityId
);
if(!activity){
return;
}
const action = button.dataset.action;
switch(action){

case "view":
    viewActivity(activity);
    break;

    case "edit":
    editActivity(activity);
    break;

    case "delete":
    deleteActivity(activity);
    break;

    case "status":
    changeActivityStatus(activity);
    break;

    default: 
    console.warn("Unknown action: ", action);
}
});
