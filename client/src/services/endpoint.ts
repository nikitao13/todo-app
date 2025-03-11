const mode = 'local';

const endpoints = {
  local: 'http://localhost:8080/api',
  production: import.meta.env.VITE_API_URL,
};

export const endpoint = endpoints[mode];
