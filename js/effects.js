const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const currentPicture = document.querySelector('#img-upload__preview-picture');
const effectNone = effectsList.querySelector('#effect-none').value;
const effectChrome = effectsList.querySelector('#effect-chrome').value;
const effectSepia = effectsList.querySelector('#effect-sepia').value;
const effectMarvin = effectsList.querySelector('#effect-marvin').value;
const effectPhobos = effectsList.querySelector('#effect-phobos').value;
const effectHeat = effectsList.querySelector('#effect-heat').value;

// Создание слайдера
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Определяет какое значение подставлять в фильтр
const updateSliderValue = (item) => {
  effectSlider.noUiSlider.on('update', () => {
    let itemValue;
    effectValue.value = effectSlider.noUiSlider.get();
    switch (item) {
      case effectChrome:
        itemValue = `grayscale(${effectValue.value})`;
        break;
      case effectSepia:
        itemValue = `sepia(${effectValue.value})`;
        break;
      case effectMarvin:
        itemValue =  `invert(${effectValue.value}%)`;
        break;
      case effectPhobos:
        itemValue =  `blur(${effectValue.value}px)`;
        break;
      case effectHeat:
        itemValue =  `brightness(${effectValue.value})`;
        break;
    }
    currentPicture.style.filter = itemValue;
  });
};

// // Функция обработчика события при клике на списке эффектов (делегирование)
const onEffectsListClick = (evt) => {
  const target = evt.target.value;

  if (target !== effectNone) {
    effectSlider.classList.remove('hidden');
    effectSlider.removeAttribute('disabled', true);
    currentPicture.className = `effects__preview--${target}`;
    effectSlider.noUiSlider.set(100);
  } else {
    effectSlider.classList.add('hidden');
    effectSlider.setAttribute('disabled', true);
    currentPicture.className = 'effects__preview--none';
    effectValue.value = '';
    currentPicture.style.filter = 'none';
  }

  switch (target) {
    case effectChrome:
    case effectSepia:
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      // eslint-disable-next-line no-unused-expressions
      (target === effectChrome) ? updateSliderValue(effectChrome) : updateSliderValue(effectSepia);
      break;
    case effectMarvin:
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      updateSliderValue(effectMarvin);
      break;
    case effectPhobos:
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      updateSliderValue(effectPhobos);
      break;
    case effectHeat:
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      updateSliderValue(effectHeat);
      break;
  }
};

export {effectsList, onEffectsListClick};

