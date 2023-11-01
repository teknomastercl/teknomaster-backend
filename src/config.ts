export const ENV: 'development' | 'qa' | 'production' = 'development';

const DB_DEV = {
  DB: {
    host: 'localhost',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomasterDev',
  },
  HOST_IP: 'https://apidev.teknomaster.cl',
};
const DB_QA = {
  DB: {
    host: '170.239.85.68',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomasterQa',
  },
  HOST_IP: 'https://apiqa.teknomaster.cl',
};
const DB_PROD = {
  DB: {
    host: 'localhost',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomaster',
  },
  HOST_IP: 'https://api.teknomaster.cl',
};

const ALL = {
  SECRET: 'eventos_party_0112!2023',
  STORAGE: '../storage',
  ENV,
};

function handleSend() {
  switch (ENV) {
    case 'development':
      return DB_DEV;
    case 'qa':
      return DB_QA;
    case 'production':
      return DB_PROD;
    default:
      return DB_DEV;
  }
}
export default { ...handleSend(), ...ALL };
