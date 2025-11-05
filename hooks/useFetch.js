import { useState, useEffect } from "react";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(params).toString();
      const finalUrl = queryString ? `${url}?${queryString}` : url;
      const response = await fetch(finalUrl);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      console.log("URL:", finalUrl);
      console.log("Result:", result);

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]); // Usar JSON.stringify para comparar objetos

  return { data, loading, error, reload: fetchData };
};

export default useFetch;
