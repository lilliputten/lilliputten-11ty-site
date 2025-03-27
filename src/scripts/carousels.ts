type CarouselSettings = Record<string, unknown>;
interface ResponsiveItem {
  breakpoint: number;
  settings: CarouselSettings;
}

const defaultCarouselSettings: CarouselSettings = {
  // @see https://kenwheeler.github.io/slick/

  dots: true,
  arrows: false,

  lazyLoad: 'ondemand',

  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,

  focusOnSelect: true,
  swipeToSlide: true,

  pauseOnHover: true,

  // autoplay: true,
  // autoplaySpeed: 2000,

  // variableWidth: true, // NOTE: It'll break `swipeToSlide` settings and require `no-caption` class to avoid broken cell' widts

  // centerMode: true,
  // centerPadding: '60px',
};

const extraCarouselSettings: Record<string, CarouselSettings> = {
  /* phoneScreenshotsWide: {
   *   slidesToShow: 6,
   *   responsive: [
   *     {
   *       breakpoint: 600,
   *       settings: {
   *         slidesToShow: 3,
   *       },
   *     },
   *   ],
   * },
   */
};

interface ResponsiveSeed {
  width: number;
  count: number;
  step: number;
}

const responsiveSeeds: Record<string, ResponsiveSeed> = {
  phoneScreenshotsWide: { width: 1600, count: 8, step: 200 },
  browserScreenshotsWide: { width: 1600, count: 3, step: 400 },
};

function seedResponsive(seed?: ResponsiveSeed) {
  if (!seed) {
    return undefined;
  }
  const { step } = seed;
  let { width, count } = seed;
  const responsives: ResponsiveItem[] = [];
  const result: CarouselSettings = {
    slidesToShow: count,
    responsive: responsives,
  };
  while (count > 0 && width > 0) {
    responsives.push({
      breakpoint: width,
      settings: {
        slidesToShow: count,
      },
    });
    width -= step;
    count--;
  }
  return result;
}

export function initCarousels() {
  const $ = window.$;
  const carousels = $('.slick-carousel');
  /*
   * $.map(carousels, (item: HTMLElement, idx: number) => {
   *   console.log('XXX', {
   *     // a,
   *     // b,
   *   });
   *   debugger;
   * });
   */
  carousels.map((idx: number, carousel: HTMLElement) => {
    const type = carousel.getAttribute('data-carousel-type');
    const extraSettings = extraCarouselSettings[type];
    const seedSettings = seedResponsive(responsiveSeeds[type]);
    const settings = { ...defaultCarouselSettings, ...extraSettings, ...seedSettings };
    console.log('[carousels:initCarousels:item]', {
      settings,
      carousel,
      type,
      idx,
    });
    $(carousel).slick(settings);
  });
  /*
  window.$('.shots-slider').slick({
    // @see https://kenwheeler.github.io/slick/

    dots: true,
    arrows: false,

    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    focusOnSelect: true,
    swipeToSlide: true,

    pauseOnHover: true,

    // centerMode: true,

    // centerPadding: '100px',
    // // variableWidth: true,

    // autoplay: true,
    // autoplaySpeed: 2000,

    lazyLoad: 'ondemand',

    // speed: 500,
    // fade: true,
    // cssEase: 'linear',
  });
  */
  /*
  window.$('.shots-slider').owlCarousel({
    margin: 20,
    loop: true,
    // autoWidth: true,
    infinite: true,
    arrows: true,
    // autoplay: true,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    dots: true,
    lazyLoad: true,
  });
  */
}
