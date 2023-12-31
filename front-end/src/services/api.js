import { tokenData } from "../constants";

const BASE_URL = "http://localhost:8080";
const token = tokenData;

export const getUsers = async () => {
  return fetch(`${BASE_URL}/user?type=user`, {
    mode: "cors",
    cache: "no-cache",
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const getFoodEntries = async () => {
  return fetch(`${BASE_URL}/foodentry`, {
    mode: "cors",
    method: "get",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const getFoodEntriesByUserId = async (
  userId,
  filterStartDate,
  filterEndDate
) => {
  return fetch(
    `${BASE_URL}/user/${userId}/foodentry?startDate=${filterStartDate}&endDate=${filterEndDate}`,
    {
      mode: "cors",
      method: "get",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const createFoodEntry = async (foodEntry) => {
  return fetch(`${BASE_URL}/foodentry`, {
    mode: "cors",
    method: "post",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(foodEntry),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const editFoodEntry = async (foodEntryId, updatedFoodEntry) => {
  return fetch(`${BASE_URL}/foodentry/${foodEntryId}`, {
    mode: "cors",
    method: "put",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(updatedFoodEntry),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const deleteFoodEntry = async (foodEntryId) => {
  return fetch(`${BASE_URL}/foodentry/${foodEntryId}`, {
    mode: "cors",
    method: "delete",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};

export const getStatistics = async () => {
  return fetch(`${BASE_URL}/statistic`, {
    mode: "cors",
    method: "get",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};
