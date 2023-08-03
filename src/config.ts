export const ENV: 'development' | 'qa' | 'production' = 'development';

const DB_DEV = {
  DB: {
    host: 'localhost',
    username: 'root',
    password: 'eventos_party_0112',
    database: 'vacilar_dev',
  },
};
const DB_QA = {
  DB: {
    host: 'localhost',
    username: 'root',
    password: 'eventos_party_0112',
    database: 'vacilar_dev',
  },
};
const DB_PROD = {
  DB: {
    host: 'matchpadel.database.windows.net',
    username: 'matchpadel',
    password: 'Padelball2020',
    database: 'mathpadel',
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
