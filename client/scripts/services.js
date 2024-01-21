const fetchConstellation = (action) => {
  fetch('http://localhost:3000/constellation')
    .then((response) => response.json())
    .then((data) => action(data));
};

const saveNode = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
