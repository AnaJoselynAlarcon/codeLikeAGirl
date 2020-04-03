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
* setAnchor
* @description Sets and capitalize innerHTML of an anchor
* @param {HTMLElement} element - An HTML element
* @param {string} content - The text that will be displayed
*/
const setAnchor = (element, content) => {
  element.innerHTML = `${content}`;
  element.style.textTransform = 'capitalize';
};

/**
* setList
* @description Sets id and click event listeners to navbar li
* @param {HTMLElement} element - An HTML element
* @param {string} section - The section name
* @param {string} type - Shows what kind of list it is
*/
const setList = (element, section, type) => {
  element.setAttribute('id', `${type}-${section}`);
  element.addEventListener('click', scrollToSection);
  if (type === 'mobile') element.addEventListener('click', closeMobileMenu);
};

/**
* appendAnchorAndList
* @description Appends an anchor and a list to populate ul
* @param {HTMLElement} navbar - An HTML ul element
* @param {HTMLElement} list - An HTML li element
* @param {HTMLElement} anchor - An HTML anchor element
*/
const appendAnchorAndList = (navbar, list, anchor) => {
  list.appendChild(anchor);
  navbar.appendChild(list);
};

/**
* isInViewport
* @description Returns true if the element is visible in viewport
* @param {HTMLElement} element - An HTML element
*/
const isInViewport = (element) => {
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
};

/**
* setMobileMenu
* @description Sets event listener on hamburger
*/
const setMobileMenu = () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.addEventListener('click', showMobileMenu);
};

/**
* setMobileClose
* @description Sets event listener on close icon
*/
const setMobileClose = () => {
  const mobileMenu = document.querySelector('#close-icon');
  mobileMenu.addEventListener('click', closeMobileMenu);
};

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
const createNavbar = (sections, list, type) => {
  const navbarList = document.querySelector(`#${list}`);
  sections.forEach(function(section) {
    let listItem = document.createElement('li');
    let anchorItem = document.createElement('a');
    setAnchor(anchorItem, section.id);
    setList(listItem, section.id, type);
    appendAnchorAndList(navbarList, listItem, anchorItem);
  });
};

// Add class 'active' to section when near top of viewport
/**
* setActiveClass
* @description Sets a nav-active class to the li when section near top viewport
* @param {NodeList} sections - A list with all the html's sections info
*/
const setActiveClass = () => {
  SECTIONS.forEach(function(section) {
    let activeSection = document.querySelector(`#nav-${section.id}`);
    if(isInViewport(section)) {
      activeSection.classList.add('nav-active');
    } else {
      activeSection.classList.remove('nav-active');
    }
  });
};

// Scroll to anchor ID using scrollTO event
/**
* scrollToSection
* @description Scrolls to the section clicked
* @param {event} event - The event of clicking on any of the navbar's li
*/
const scrollToSection = (event) => {
  const section = document.querySelector(`#${event.target.innerHTML}`);
  const top = section.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top, behavior: 'smooth'});
};

// Mobile menu
/**
* showMobileMenu
* @description Sets a class to show the mobile menu
*/
const showMobileMenu = () => {
  const mobileWindow = document.querySelector('#mobile-window');
  mobileWindow.classList.add('show');
};

/**
* closeMobileMenu
* @description Sets and removes classes to hide the mobile menu
*/
const closeMobileMenu = () => {
  const mobileWindow = document.querySelector('#mobile-window');
  mobileWindow.classList.remove('show');
  mobileWindow.classList.add('remove');
};

/**
 * End Main Functions
 * Begin Events
*/

// Build desktop menu
createNavbar(SECTIONS, 'navbar-list', 'nav');

//Build mobile menu
createNavbar(SECTIONS, 'mobile-list', 'mobile');

// Listen to scroll event in order to set active class
window.addEventListener('scroll', setActiveClass);

//Sets the event listeners for mobile menu
setMobileMenu();
setMobileClose();


