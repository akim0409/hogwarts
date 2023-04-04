const BASE_URL = 'http://localhost:3001';


export const apiFetch = ({ path, method, body }) => {
  return fetch(BASE_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', //cookie
    body: body ? JSON.stringify(body) : undefined
  });
};




// response = await apiFetch({ path: '/wizards', method: 'GET' });