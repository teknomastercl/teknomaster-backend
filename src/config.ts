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
    host: 'localhost',
    username: 'root',
    password: 'Servicios_1803',
    database: 'teknomaster_qa',
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
