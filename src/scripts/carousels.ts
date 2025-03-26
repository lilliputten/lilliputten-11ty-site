export function initCarousels() {
  window.$('.shots-slider').owlCarousel({
    margin: 20,
    loop: true,
    autoWidth: true,
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    dots: true,
  });
}
