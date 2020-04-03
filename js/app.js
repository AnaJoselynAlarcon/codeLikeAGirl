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
window.addEventListener('scroll', setActiveClass);
const SECTIONS = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
*/

/**
* setAnchor
* @description Sets and capitalize innerHTML of an anchor
* @param {HTMLElement} element - An HTML element
* @param {string} content - The text that will be displayed
*/
function setAnchor(element, content) {
  element.innerHTML = `${content}`;
  element.style.textTransform = 'capitalize';
}

/**
* setList
* @description Sets id and click event listener to navbar li
* @param {HTMLElement} element - An HTML element
* @param {string} section - The section name
*/
function setList(element, section) {
  element.setAttribute('id', `nav-${section}`);
  element.addEventListener('click', scrollToSection)
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
* isInViewport
* @description Returns true if the element is visible in viewport
* @param {HTMLElement} element - An HTML element
*/
function isInViewport (element) {
  const { top, bottom } = element.getBoundingClientRect();
  const html = document.documentElement;
  const viewportHeight = (window.innerHeight || html.clientHeight);
  const viewportWidth = (window.innerWidth || html.clientWidth);

  return (
    top >= -30 &&
    bottom >= 0 &&
    top < viewportHeight &&
    bottom < viewportWidth
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
*/

// build the nav
/**
* createNavbar
* @description Creates dynamic navbar
* @param {NodeList} sections - A list with all the html's sections info
*/
function createNavbar(sections) {
  const navbarList = document.querySelector('#navbar-list');
  sections.forEach(function(section, index) {
    let listItem = document.createElement('li');
    let anchorItem = document.createElement('a');
    setAnchor(anchorItem, section.id, index);
    setList(listItem, section.id, index)
    appendAnchorAndList(navbarList, listItem, anchorItem);
  });
}

// Add class 'active' to section when near top of viewport
/**
* setActiveClass
* @description Sets a nav-active class to the li when section near top viewport
* @param {NodeList} sections - A list with all the html's sections info
*/
function setActiveClass() {
  SECTIONS.forEach(function(section) {
    let activeSection = document.querySelector(`#nav-${section.id}`)
    if(isInViewport(section)) {
      activeSection.classList.add('nav-active')
    } else {
      activeSection.classList.remove('nav-active')
    }
  });
}

// Scroll to anchor ID using scrollTO event
/**
* scrollToSection
* @description Scrolls to the section clicked
* @param {event} event - The event of clicking on any of the navbar's li
*/
function scrollToSection(event) {
  console.log(event.target)
  const section = document.querySelector(`#${event.target.innerHTML}`)
  const top = section.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top, behavior: 'smooth'});
}

/**
 * End Main Functions
 * Begin Events
*/

// Build menu
createNavbar(SECTIONS);


// Set sections as active
setActiveClass();


