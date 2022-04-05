const listOfPhotos = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const fragmentOfPhotos = document.createDocumentFragment();

const addUsersPhotos = (list) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  list.forEach(({ id, url, likes, comments }) => {
    const photoElement = templatePicture.cloneNode(true);
    photoElement.id = id;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragmentOfPhotos.appendChild(photoElement);
  });

  listOfPhotos.appendChild(fragmentOfPhotos);
};

export {addUsersPhotos};

