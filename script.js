const profileBtn = document.querySelector(".profile-btn");
const dropdown = document.querySelector(".dropdown");
const hamburger = document.querySelector(".hamburger-icon");
const sidebar = document.querySelector(".sidebar");
const navLinks = document.querySelectorAll(".navigation a");
const overlay = document.querySelector(".overlay");
const searchInput = document.querySelector(".dashboard-search");
const tableRows = document.querySelectorAll("tbody tr");
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
const noResultRow = document.createElement("tr");
const tableCol = document.createElement("td");

tableCol.textContent = "No results found";
tableCol.colSpan = 4;

noResultRow.appendChild(tableCol);
noResultRow.classList.add("no-results-row", "hidden");
tableBody.appendChild(noResultRow); 


searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let matchCount = 0;
    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const isMatch = rowText.includes(searchTerm);
        row.classList.toggle("hidden", !isMatch);
        if(isMatch){
            matchCount++;
        }
});
noResultRow.classList.toggle("hidden", matchCount !==0);
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