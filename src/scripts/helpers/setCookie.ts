/**
 * @param {string} id
 * @param {string} val
 * @param {number} [maxAgeSecs] -- Seconds of expire period
 */
export function setCookie(id: string, val: string, maxAgeSecs?: number) {
  const cookieVal = [id, val || ''].map(encodeURIComponent).join('=');
  const parts = [
    // prettier-ignore
    cookieVal,
    'path=/',
  ];
  if (maxAgeSecs) {
    parts.push('max-age=' + maxAgeSecs);
  }
  const fullCookie = parts.filter(Boolean).join(';');
  document.cookie = fullCookie;
}

export function deleteAllCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });
}
