let updateVisualizationCallback: () => void;

/* // Compare width (from css variables):
 * $screenSmMin: map.get($grid-breakpoints, 'sm'); // 576
 * $screenMdMin: map.get($grid-breakpoints, 'md'); // 768
 * $screenLgMin: map.get($grid-breakpoints, 'lg'); // 992
 * $screenXlMin: map.get($grid-breakpoints, 'xl'); // 1200
 * $screenXxlMin: map.get($grid-breakpoints, 'xxl'); // 1400
 */
const maxMobileWidth = 768;

function updateShowNavigation() {
  const { body } = document;
  const navbarContent = document.getElementById('navbarNavigation');
  const showNavbarContent = navbarContent?.classList.contains('show');
  const docWidth = document.documentElement.clientWidth;
  // Compare width (from css variables):
  const isMobileView = docWidth < maxMobileWidth;
  const showNavigation = isMobileView && showNavbarContent;
  // TODO: To use local variable if no `navbarContent` is available?
  body.classList.toggle('mobileView', isMobileView);
  body.classList.toggle('wideView', !isMobileView);
  body.classList.toggle('showNavigation', showNavigation);
  if (updateVisualizationCallback) {
    updateVisualizationCallback();
  }
}

export function setUpdateVisualizationCallback(cb: () => void) {
  updateVisualizationCallback = cb;
  updateShowNavigation();
}

export function initNavigation() {
  const button = document.getElementById('toggleNavigation');
  const updateCb = setTimeout.bind(
    null,
    requestAnimationFrame.bind(null, updateShowNavigation),
    10,
  );
  if (button) {
    button?.addEventListener('click', updateCb);
  }
  window.addEventListener('resize', updateShowNavigation, false);
  updateShowNavigation();
}
