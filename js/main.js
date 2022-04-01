import {addUsersPhotos} from './add-photos.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form.js';
import {showAlert} from './utils.js';
import {closeUploadPhoto} from './upload-photo.js';
import './big-photo.js';
import './scale.js';
import './filter.js';

getData(addUsersPhotos, showAlert);

setUserFormSubmit(closeUploadPhoto);
