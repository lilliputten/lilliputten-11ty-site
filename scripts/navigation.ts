let updateVisualizationCallback: () => void;

/* // Compare width (from css variables):
 * $screenSmMin: map.get($grid-breakpoints, 'sm'); // 576
 * $screenMdMin: map.get($grid-breakpoints, 'md'); // 768
 * $screenLgMin: map.get($grid-breakpoints, 'lg'); // 992
 * $screenXlMin: map.get($grid-breakpoints, 'xl'); // 1200
 * $screenXxlMin: map.get($grid-breakpoints, 'xxl'); // 1400
 */
const maxMobileWidth = 768;

let toggleNavigationButton: HTMLElement;

function updateShowNavigation() {
  const { body } = document;
  const button = getToggleNavigationButton();
  const isExpanded = button?.getAttribute('aria-expanded') === 'true';
  const docWidth = document.documentElement.clientWidth;
  // Compare width (from css variables):
  const mobileView = docWidth < maxMobileWidth;
  body.classList.toggle('mobileView', mobileView);
  body.classList.toggle('wideView', !mobileView);
  body.classList.toggle('showNavigation', isExpanded);
  if (updateVisualizationCallback) {
    updateVisualizationCallback();
  }
}

export function setUpdateVisualizationCallback(cb: () => void) {
  updateVisualizationCallback = cb;
  updateShowNavigation();
}

function getToggleNavigationButton() {
  if (!toggleNavigationButton) {
    toggleNavigationButton = document.getElementById('toggleNavigation');
  }
  return toggleNavigationButton;
}

export function initNavigation() {
  const button = getToggleNavigationButton();
  const cb = requestAnimationFrame.bind(null, updateShowNavigation);
  button.addEventListener('click', cb);
  window.addEventListener('resize', cb, false);
  cb();
}
