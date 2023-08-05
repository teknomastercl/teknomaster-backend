export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Solo se permite JPG, JPEG, PNG, GIF'), false);
  }
  callback(null, true);
};
