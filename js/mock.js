import {getRandomNumber, getRandomArrayElement} from './utils.js';

const DESCRIPTION = 'Это какое то описание';

const LIST_OF_COMMENTATORS = [
  'Василий Алибабаевич',
  'Чунгачанга',
  'Кузьма',
  'Уинстон Черчиль',
  'Иванов Иван Иванович',
  'Алеша Попович',
  'Мистер Комментарий',
  'Диванный аналитик',
  'Эксперт по жизни',
  'Шурик',
];

const LIST_OF_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createObject = (item, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: DESCRIPTION,
  likes: getRandomNumber(15, 200),
  comments: [{
    id: index + 1,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(LIST_OF_COMMENTS),
    name: getRandomArrayElement(LIST_OF_COMMENTATORS)
  }]
});

const getUsersPhotos = (count) => Array.from({length: count}, createObject);


const addUsersPhotos = (listItem) => {
  const listOfPhotos = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragmentOfPhotos = document.createDocumentFragment();

  listItem.forEach(({url, likes, comments}) => {
    const photoElement = template.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragmentOfPhotos.appendChild(photoElement);
  });

  listOfPhotos.appendChild(fragmentOfPhotos);
};

export {getUsersPhotos, addUsersPhotos};
