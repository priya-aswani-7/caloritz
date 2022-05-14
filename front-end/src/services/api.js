const BASE_URL = "http://localhost:8080";

export const getFoodEntries = async () => {
  return fetch(`${BASE_URL}/foodentry`, {
    mode: "cors",
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const getUsers = async () => {
  return fetch(`${BASE_URL}/user?type=user`, {
    mode: "cors",
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};
