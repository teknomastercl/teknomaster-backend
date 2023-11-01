import { errorSend } from './errorSend';

export const imageFileFilter = (originalname) => {
  if (!originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return errorSend(1, 'Solo se permite JPG | JPEG | PNG | GIF | WEBP');
  }
  return null;
};
