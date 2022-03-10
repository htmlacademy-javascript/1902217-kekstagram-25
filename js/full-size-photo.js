const createFullSize = (listItem) => {
  const usersPhoto = document.querySelectorAll('.picture');
  const modalWindow = document.querySelector('.big-picture');
  const body = document.querySelector('body');
  const fullPhotoClose = modalWindow.querySelector('.big-picture__cancel');

  for (let i = 0; i < usersPhoto.length; i++) {
    usersPhoto[i].addEventListener('click', (evt) => {
      const element = listItem[i];
      evt.preventDefault();
      body.classList.add('modal-open');
      modalWindow.querySelector('.social__comment-count').classList.add('hidden');
      modalWindow.querySelector('.comments-loader').classList.add('hidden');
      modalWindow.classList.remove('hidden');
      modalWindow.querySelector('.big-picture__img').querySelector('img').src = element.url;
      modalWindow.querySelector('.likes-count').textContent = element.likes;
      modalWindow.querySelector('.comments-count').textContent = element.comments.length;
      modalWindow.querySelector('.social__caption').textContent = element.description;
      element.comments.forEach(({ avatar, message, name }) => {
        const elementOfComment = document.querySelector('.social__comment').cloneNode(true);
        const commentator = elementOfComment.querySelector('.social__picture');
        commentator.src = avatar;
        commentator.alt = name;
        elementOfComment.querySelector('.social__text').textContent = message;
        document.querySelector('.social__comments').append(elementOfComment);
      });
    });
  }

  fullPhotoClose.addEventListener('click', () => {
    modalWindow.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      modalWindow.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

export {createFullSize};
