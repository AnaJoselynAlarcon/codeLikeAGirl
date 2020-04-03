/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
*/
const SECTIONS = document.querySelectorAll('section');



/**
 * End Global Variables
 * Start Helper Functions
*/

/**
* setContent
* @description Sets the innerHTML of an element
* @param {HTMLElement} element - An HTML element
* @param {string} content - The text that will be displayed
*/
function setContent(element, content) {
  element.innerHTML = `${content.toUpperCase()}`;
}

/**
* appendAnchorAndList
* @description Appends an anchor and a list to populate ul
* @param {HTMLElement} navbar - An HTML ul element
* @param {HTMLElement} list - An HTML li element
* @param {HTMLElement} list - An HTML anchor element
*/
function appendAnchorAndList(navbar, list, anchor) {
  list.appendChild(anchor);
  navbar.appendChild(list);
}

/**
* createNavbar
* @description Creates dynamic navbar
* @param {NodeList} sections - A list with all the html's sections info
*/
function createNavbar(sections) {
  const navbarList = document.querySelector('#navbar-list');
  return sections.forEach(function(section) {
    let listItem = document.createElement('li');
    let anchorItem = document.createElement('a');
    setContent(anchorItem, section.id);
    appendAnchorAndList(navbarList, listItem, anchorItem);
  }
)}



/**
 * End Helper Functions
 * Begin Main Functions
*/

// build the nav
createNavbar(SECTIONS);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
*/

// Build menu

// Scroll to section on link click

// Set sections as active


