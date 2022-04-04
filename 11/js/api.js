const getData = (url, onSuccess, onFail) => {
  fetch(
    url
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Не удалось загрузить данные с сервера. Попробуйте перезагрузить страницу!');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные с сервера. Попробуйте перезагрузить страницу!');
    });
};


const sendData = (url, onSuccess, onFail, body) => {
  fetch(
    url,
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

