import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectBreedEl = document.querySelector('.breed-select');
const divCatInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorMessage = 'Oops! Something went wrong! Try reloading the page!';

selectBreedEl.addEventListener('change', onClickGetCatInfo);

fetchBreeds()
  .then(breeds => {
    onRenderSelectValue(breeds);

    loaderEl.classList.add('is-hidden');
  })
  .catch(error => {
    loaderEl.classList.add('is-hidden');
    Notify.failure(errorMessage);
  });

function onClickGetCatInfo(event) {
  loaderEl.classList.remove('is-hidden');
  divCatInfoEl.classList.add('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breeds => {
      onRenderCatMarkup(breeds);

      divCatInfoEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
    })
    .catch(error => {
      Notify.failure(errorMessage);
      loaderEl.classList.add('is-hidden');
    });
}

function onRenderSelectValue(breeds) {
  const markup = breeds
    .map(({ name, id }) => {
      return `<option value='${id}'>${name}</option>`;
    })
    .join('');

  selectBreedEl.innerHTML = markup;

  new SlimSelect({
    select: selectBreedEl,
  });
}

function onRenderCatMarkup(breeds) {
  const markup = breeds
    .map(({ url, breeds: [{ name, temperament, description }] }) => {
      return `
      <img class="cat-info__cat-img" src="${url}" alt="cat ${name}" width="460px">
      <div class="cat-info__text-box">
        <h2 class="cat-info__tittle">${name}</h2>
        <p class="cat-info__description">${description}</p>
        <p class="cat-info__temperament"><span class="temperament__header">Temperament:</span> ${temperament}</p>
      </div>`;
    })
    .join();

  divCatInfoEl.innerHTML = markup;
}
