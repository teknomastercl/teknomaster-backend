import * as moment from 'moment';
import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const dateStr = moment().format('YYYY_MM_DD_HH_mm');
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}_${dateStr}${fileExtName}`);
};
