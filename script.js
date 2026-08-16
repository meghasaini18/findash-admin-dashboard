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

//search
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const tableRows = tableBody.querySelectorAll(".activity-row");
    let matchCount = 0;
    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const isMatch = rowText.includes(searchTerm);
        row.classList.toggle("hidden", !isMatch);
        if(isMatch){
            matchCount++;
        }
});
// Find an existing "no results" row, if there is one
    const existingNoResultRow = tableBody.querySelector(".no-results-row");

    if (matchCount === 0) {

        // Only create it if it doesn't already exist
        if (!existingNoResultRow) {
            const noResultRow = document.createElement("tr");
            const tableCol = document.createElement("td");

            tableCol.textContent = "No results found";
            tableCol.colSpan = 4;

            noResultRow.classList.add("no-results-row");
            noResultRow.appendChild(tableCol);

            tableBody.appendChild(noResultRow);
        }

    } else {

        // Remove it when results are found
        if (existingNoResultRow) {
            existingNoResultRow.remove();
        }
    }
});


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
        name: "Aisha",
        status: "Completed",
        statusClass: "completed",
        date: "Today",
        action: "view"
    },
    {
        name: "Rahul",
        status: "Pending",
        statusClass: "pending",
        date: "Yesterday",
        action: "edit"
    },
    {
        name: "John",
        status: "In Progress",
        statusClass: "progress",
        date: "Jun 12",
        action: "delete"
    },
    {
        name: "Emily",
        status: "Completed",
        statusClass: "completed",
        date: "Jun 13",
        action: "view"
    }
];

function renderActivityTable(data) {
    tableBody.innerHTML = "";
    const actionLabels = {
                    view: "View",
                    edit: "Edit",
                    delete: "Delete"
                };

    data.forEach(activity => {
 
        const row = document.createElement("tr");
        row.classList.add("activity-row");
        const nameCell = document.createElement("td");
        const statusCell = document.createElement("td");

        //create span for status
        const statusSpan = document.createElement("span");
        statusSpan.classList.add("status",
                                activity.statusClass);
        statusSpan.textContent = activity.status;

        const dateCell = document.createElement("td");
        const actionCell = document.createElement("td");

         //button
        const button = document.createElement("button");
        button.classList.add("action-btn",
                            activity.action.toLowerCase() + "-btn");
        button.setAttribute("type", "button");
        button.setAttribute("data-action", activity.action);
        button.textContent = actionLabels[activity.action];
        // button.textContent = activity.action;

        nameCell.textContent = activity.name;
        statusCell.appendChild(statusSpan);
        dateCell.textContent = activity.date;
        actionCell.appendChild(button);

        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        tableBody.append(row);
});
}

renderActivityTable(activityData);
