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
  const mobileView = docWidth < maxMobileWidth;
  const showNavigation = mobileView && showNavbarContent;
  // TODO: To use local variable if no `navbarContent` is available?
  body.classList.toggle('mobileView', mobileView);
  body.classList.toggle('wideView', !mobileView);
  body.classList.toggle('showNavigation', showNavigation);
  if (updateVisualizationCallback) {
    updateVisualizationCallback();
  }
}

export function setUpdateVisualizationCallback(cb: () => void) {
  updateVisualizationCallback = cb;
  updateShowNavigation();
}

function createCb(delay: number) {
  return requestAnimationFrame.bind(null, setTimeout.bind(null, updateShowNavigation, delay));
}

export function initNavigation() {
  const button = document.getElementById('toggleNavigation');
  // NOTE: Temporarily solution to avoid a big delay for mobile classes update (repeat checks with diferent delays)
  // TODO: To provide more decent solution
  const cb1 = createCb(100);
  const cb2 = createCb(500);
  const cb3 = createCb(700);
  if (button) {
    button?.addEventListener('click', () => {
      cb1();
      cb2();
      cb3();
    });
  }
  window.addEventListener('resize', updateShowNavigation, false);
  updateShowNavigation();
}
