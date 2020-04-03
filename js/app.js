
const SECTIONS = document.querySelectorAll('section');

// --------------- DYNAMIC NAVBAR ---------------
/**
* setAnchor
* @description Sets and capitalizes innerHTML of an anchor
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

// --------------- MOBILE MENU ---------------
/**
* setMobileMenuListeners
* @description Sets event listener on mobile menu
*/
const setMobileMenuListeners = () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.addEventListener('click', showMobileMenu);
  const closeIcon = document.querySelector('#close-icon');
  closeIcon.addEventListener('click', closeMobileMenu);
};

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

// --------------- SCROLL AND VIEWPORT ---------------
/**
* isInViewport
* @description Returns true if the element is visible in viewport
* @param {HTMLElement} element - An HTML element
*/
const isInViewport = (element) => {
  const { top, bottom } = element.getBoundingClientRect();
  const html = document.documentElement;
  const viewportHeight = (window.innerHeight || html.clientHeight);

  return (
    top >= 0 &&
    bottom >= 0 &&
    top < viewportHeight
  );
};

/**
* setActiveClass
* @description Sets and removes nav-active class when in viewport
* for mobile and desktop navbars
*/
const setActiveClass = () => {
  SECTIONS.forEach(function(section) {
    let activeSection = document.querySelector(`#nav-${section.id}`);
    let activeMobile = document.querySelector(`#mobile-${section.id}`);
    if(isInViewport(section)) {
      activeSection.classList.add('nav-active');
      activeMobile.classList.add('nav-active');
    } else {
      activeSection.classList.remove('nav-active');
      activeMobile.classList.remove('nav-active');
    }
  });
};

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


// --------------- EVENTS ---------------

//Creates desktop navbar
createNavbar(SECTIONS, 'navbar-list', 'nav');

//Creates mobile navbar and sets listeners
createNavbar(SECTIONS, 'mobile-list', 'mobile');
setMobileMenuListeners();

//Listens for an scroll
window.addEventListener('scroll', setActiveClass);


