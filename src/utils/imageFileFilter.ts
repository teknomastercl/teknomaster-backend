import { errorSend } from './errorSend';

export const imageFileFilter = (originalname) => {
  if (!originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return errorSend(1, 'Solo se permite JPG, JPEG, PNG, GIF');
  }
  return null;
};
