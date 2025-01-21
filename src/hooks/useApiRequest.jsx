import { useState, useCallback } from "react";
import axios from "axios";

const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, method) => {
    setLoading(true);
    setError(null);
    setData(null);
  
    try {
      const response = await axios({
        url,
        method,
      });
      setData(response);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }   
  }, []);

  return { loading, error, sendRequest, data };
};

export default useApiRequest;
