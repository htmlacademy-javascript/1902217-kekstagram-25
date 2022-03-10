import {getUsersPhotos, addUsersPhotos} from './mock.js';
import {createFullSize} from './full-size-photo.js';

const photos = getUsersPhotos(25);
addUsersPhotos(photos);
createFullSize(photos);
