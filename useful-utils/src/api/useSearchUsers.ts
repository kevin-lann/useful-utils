import { useState } from "react";
import axios from "axios";

const useSearchUsers = () => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async (search: string) => {
    console.log("Searching: " + search)
    setIsLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/users/search?q=${search}`);
      setData(response.data);
    } catch (error) {
      setError("Error fetching search users");
      console.error("Error fetching search users", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch: fetchSession };
};

export default useSearchUsers;