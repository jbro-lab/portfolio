const homeNav = document.getElementById("home");
const currentWorkNav = document.getElementById("currentWorkNav");
const webdevNav = document.getElementById("webdevNav");
const datasecNav = document.getElementById("data&secNav");
const aboutmeNav = document.getElementById("aboutmeNav");
const coursesNav = document.getElementById("coursesNav");
const skillsNav = document.getElementById("skillsNav");
const contactNav = document.getElementById("contactNav");

// Get the position of the target element relative to the document
const currentWorkElement = document.getElementById("current");
const webdevElement = document.getElementById("webdev");
const datasecElement = document.getElementById("data&sec");
const aboutmeElement = document.getElementById("aboutme");
const coursesElement = document.getElementById("courses");
const skillsElement = document.getElementById("skills");
const contactElement = document.getElementById("contact");

const currentElementOffset = currentWorkElement.offsetTop;
const webdevElementOffset = webdevElement.offsetTop;
const datasecElementOffset = datasecElement.offsetTop;
const aboutmeElementOffset = aboutmeElement.offsetTop;
const coursesElementOffset = coursesElement.offsetTop;
const skillsElementOffset = skillsElement.offsetTop;
const contactElementOffset = contactElement.offsetTop;

function isBottomOfPage() {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return scrollPosition + windowHeight + 5 >= documentHeight;
}

function handleScroll() {
  const scrollPosition = window.scrollY;

  if (
    scrollPosition > currentElementOffset &&
    scrollPosition < webdevElementOffset
  ) {
    homeNav.classList.remove("active");
    webdevNav.classList.remove("active");
    datasecNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    coursesNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.remove("active");
    currentWorkNav.classList.add("active");
  } else if (
    scrollPosition > webdevElementOffset &&
    scrollPosition < datasecElementOffset
  ) {
    homeNav.classList.remove("active");
    currentWorkNav.classList.remove("active");
    datasecNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    coursesNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.remove("active");
    webdevNav.classList.add("active");
  } else if (
    scrollPosition > datasecElementOffset &&
    scrollPosition < aboutmeElementOffset
  ) {
    homeNav.classList.remove("active");
    currentWorkNav.classList.remove("active");
    webdevNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    coursesNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.remove("active");
    datasecNav.classList.add("active");
  } else if (
    scrollPosition > aboutmeElementOffset &&
    scrollPosition < coursesElementOffset
  ) {
    homeNav.classList.remove("active");
    currentWorkNav.classList.remove("active");
    webdevNav.classList.remove("active");
    datasecNav.classList.remove("active");
    coursesNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.remove("active");
    aboutmeNav.classList.add("active");
  } else if (
    scrollPosition > coursesElementOffset &&
    scrollPosition < skillsElementOffset
  ) {
    homeNav.classList.remove("active");
    currentWorkNav.classList.remove("active");
    webdevNav.classList.remove("active");
    datasecNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.remove("active");
    coursesNav.classList.add("active");
  } else if (
    scrollPosition > skillsElementOffset &&
    scrollPosition < contactElementOffset &&
    !isBottomOfPage()
  ) {
    homeNav.classList.remove("active");
    currentWorkNav.classList.remove("active");
    webdevNav.classList.remove("active");
    datasecNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    coursesNav.classList.remove("active");
    contactNav.classList.remove("active");
    skillsNav.classList.add("active");
  } else if (scrollPosition > contactElementOffset || isBottomOfPage()) {
    homeNav.classList.remove("active");
    currentWorkNav.classList.remove("active");
    webdevNav.classList.remove("active");
    datasecNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    coursesNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.add("active");
  } else {
    currentWorkNav.classList.remove("active");
    webdevNav.classList.remove("active");
    datasecNav.classList.remove("active");
    aboutmeNav.classList.remove("active");
    coursesNav.classList.remove("active");
    skillsNav.classList.remove("active");
    contactNav.classList.remove("active");
    homeNav.classList.add("active");
  }
}
window.addEventListener("scroll", handleScroll);
