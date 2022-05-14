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

export const editFoodEntry = async (foodEntryId, updatedFoodEntry) => {
  return fetch(`${BASE_URL}/foodentry/${foodEntryId}`, {
    mode: "cors",
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFoodEntry),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};
