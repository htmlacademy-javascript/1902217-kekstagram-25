///////////////////////////// Генератор случайных чисел, включительно

function getRandomNumber (a, b)  {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

getRandomNumber ();

///////////////////////// Проверка длины строки комментария

const toCheckString = (verifiableString, maxString) => verifiableString.length <= maxString;

toCheckString();

//////////////////////////////// Больше деталей

const QUANTITY_OF_PHOTOS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

const LIST_OF_DESCRIPTIONS = [
  'Вид на отель',
  'Дорога на пляж',
  'Райское место',
  'Это она',
  'Приятного аппетита',
  'Железный черный конь',
  'А на десерт у нас',
  'Жидкие витамины',
  'Аэрошоу',
  'Комфорт в сочетании с лаконичностью',
  'Луч солнца золотого',
  'Шик на фон деревни',
  'Также вкусно, как и полезно',
  'СушиКот',
  'Ноги всегда должны быть в тепле',
  'Земля в иллюминаторе',
  'Угадай кто фальшивит',
  'Старое доброе - ничто не испортит',
  'Свет моих проникает фар',
  'Пальмы по стойке - смирно!',
  'Эстетико-гастрономическое удовольствие!',
  'Ахх, этот закат....',
  'Хозяин острова',
  'Множество в одном целом',
  'Речная таможня',
];

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

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createNewPhoto = QUANTITY_OF_PHOTOS.map((newPhotos, idx) => {
  return {
    id: QUANTITY_OF_PHOTOS[idx],
    url: 'photos/' + QUANTITY_OF_PHOTOS[idx] + '.jpg',
    description: LIST_OF_DESCRIPTIONS[idx],
    likes: getRandomNumber(15, 200),
    comments: {
      id: QUANTITY_OF_PHOTOS[idx],
      avatar: 'img/avatar-'+ getRandomNumber(1, 6) + '.svg',
      message: getRandomArrayElement(LIST_OF_COMMENTS),
      name: getRandomArrayElement(LIST_OF_COMMENTATORS)
    }
  };
});

createNewPhoto();
