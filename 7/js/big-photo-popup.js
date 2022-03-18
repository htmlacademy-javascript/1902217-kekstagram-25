import {isEscPressed} from './utils.js';
import {collectionOfPhotos} from './mock.js';

const popup = document.querySelector('.big-picture');
const body = document.querySelector('body');
const popupCloseButton = popup.querySelector('.big-picture__cancel');

// ----------Функция рендера большого фото
const renderPopup = (item) => {
  popup.querySelector('.big-picture__img').querySelector('img').src = item.url;
  popup.querySelector('.likes-count').textContent = item.likes;
  popup.querySelector('.comments-count').textContent = item.comments.length;
  popup.querySelector('.social__caption').textContent = item.description;
  const popupComments = document.querySelector('.social__comments');
  const popupComment = document.querySelector('.social__comment').cloneNode(true);
  popupComments.innerHTML = '';
  item.comments.forEach(({ avatar, message, name }) => {
    const commentator = popupComment.querySelector('.social__picture');
    commentator.src = avatar;
    commentator.alt = name;
    popupComment.querySelector('.social__text').textContent = message;
    popupComments.append(popupComment);
  });
};

const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function openPopup (item) {
  body.classList.add('modal-open');
  popup.classList.remove('hidden');
  popup.querySelector('.social__comment-count').classList.add('hidden');
  popup.querySelector('.comments-loader').classList.add('hidden');
  renderPopup(item);

  document.addEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.addEventListener('click', closePopup);
}

function closePopup () {
  body.classList.remove('modal-open');
  popup.classList.add('hidden');
  popup.querySelector('.social__comment-count').classList.remove('hidden');
  popup.querySelector('.comments-loader').classList.remove('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.removeEventListener('click', closePopup);
}

const onPopupClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const target = evt.target.closest('.picture');
    evt.preventDefault();
    const itemFromCollection = collectionOfPhotos.find((item) => item.id === Number(target.id));
    openPopup(itemFromCollection);
  }
};

export {collectionOfPhotos, onPopupClick, body};
