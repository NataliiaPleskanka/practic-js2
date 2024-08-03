export function createMarkup(array) {
  return array
    .map(
      ({ alt_description, urls: { small } }) =>
        `<li class="gallery__item"><img src="${small}" alt="${alt_description}"/></li>`
    )
    .join('');
}
