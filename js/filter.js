const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const currentPicture = document.querySelector('#img-upload__preview-picture');

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

// // Функция обработчика события при клике на списке эффектов (делегирование)
function onEffectsListClick (evt) {
  const target = evt.target.value;

  if (target !== 'none') {
    effectSlider.classList.remove('hidden');
    effectSlider.removeAttribute('disabled', true);
    currentPicture.className = `effects__preview--${target}`;
    effectSlider.noUiSlider.on('update', () => {
      effectValue.value = effectSlider.noUiSlider.get();
    });
  } else {
    effectSlider.classList.add('hidden');
    effectSlider.setAttribute('disabled', true);
    currentPicture.className = 'effects__preview--none';
    effectValue.value = '';
    currentPicture.style.filter = 'none';
  }

  switch (target) {
    case 'chrome':
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        currentPicture.style.filter = `grayscale(${effectValue.value})`;
      });
      break;
    case 'sepia':
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        currentPicture.style.filter = `sepia(${effectValue.value})`;
      });
      break;
    case 'marvin':
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectSlider.noUiSlider.on('update', () => {
        currentPicture.style.filter = `invert(${effectValue.value}%)`;
      });
      break;
    case 'phobos':
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        currentPicture.style.filter = `blur(${effectValue.value}px)`;
      });
      break;
    case 'heat':
      effectSlider.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        currentPicture.style.filter = `brightness(${effectValue.value})`;
      });
      break;
  }
}

export {effectsList, onEffectsListClick};

