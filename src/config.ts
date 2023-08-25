export const ENV: 'development' | 'qa' | 'production' = 'production';

const DB_DEV = {
  DB: {
    host: 'localhost',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomaster_dev',
  },
};
const DB_QA = {
  DB: {
    host: '170.239.85.68',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomasterQa',
  },
};
const DB_PROD = {
  DB: {
    host: 'localhost',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomaster',
  },
};

const ALL = {
  SECRET: 'eventos_party_0112!2023',
  STORAGE: '../storage',
  HOST_IP: 'https://api.teknomaster.cl',
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
