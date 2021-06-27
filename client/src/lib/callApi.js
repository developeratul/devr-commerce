// for fetching my internal back-end routes at localhost:8000 in development
const callApi = async (route, method, headers) => {
  try {
    const apiUrl =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

    const res = await fetch(`${apiUrl}${route}`, {
      method,
      headers,
    });

    const body = await res.json();

    return { body, status: res.status };
  } catch (err) {
    throw new Error(err);
  }
};

export default callApi;
