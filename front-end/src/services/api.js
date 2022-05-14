const BASE_URL = "http://localhost:8080";

export const getFoodEntries = async (setFoodEntries, setError) => {
  fetch(`${BASE_URL}/foodentry`, {
    mode: "cors",
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setFoodEntries(data.data);
      setError(null);
    })
    .catch((error) => setError(error));
};
