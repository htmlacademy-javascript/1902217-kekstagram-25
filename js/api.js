const getDATA = 'https://25.javascript.pages.academy/kekstagram/data';
const sendDATA = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(
    getDATA
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Не удалось получить данные с сервера. Попробуйе перезагрузить страницу!');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Не удалось получить данные с сервера. Попробуйе перезагрузить страницу!');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    sendDATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};

