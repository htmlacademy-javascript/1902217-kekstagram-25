const scaleControlsFieldset = document.querySelector('.img-upload__scale');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const currentPicture = document.querySelector('#img-upload__preview-picture');

let currentStep = 100;
const SCALE_CONTROL_STEP = 25;
const SCALE_STEP_MIN = 25;
const SCALE_STEP_MAX = 100;

// Увеличивает или уменьшает фотографию во вкладке редактирования
const onScaleControlsClick = (evt) => {
  const target = evt.target;
  if (target === scaleControlSmaller && currentStep > SCALE_STEP_MIN) {
    currentStep -= SCALE_CONTROL_STEP;
  }
  if (target === scaleControlBigger && currentStep < SCALE_STEP_MAX) {
    currentStep += SCALE_CONTROL_STEP;
  }
  scaleControlValue.value = `${currentStep}%`;
  currentPicture.style.transform = `scale(${currentStep * 0.01})`;
};

export {scaleControlsFieldset, onScaleControlsClick};
