function showNoise() {
  const noise = window.document.getElementById('noise');
  if (noise) {
    noise.classList.toggle('show', true);
  }
}

window.addEventListener('load', showNoise);
