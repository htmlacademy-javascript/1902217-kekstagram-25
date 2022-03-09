import { getUsersPhotos } from './mock.js';

const listOfPhotos = document.querySelector('.pictures');
const usersPhotos = getUsersPhotos(25);
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragmentOfPhotos = document.createDocumentFragment();

usersPhotos.forEach(({url, likes, comments}) => {
  const photoElement = template.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  fragmentOfPhotos.appendChild(photoElement);
});

listOfPhotos.appendChild(fragmentOfPhotos);
