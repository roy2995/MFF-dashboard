import { useEffect, useState } from "react";

export const useApiGateway = (fn) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fn();
          setData(res);
        } catch (error) {
          console.log(error)
          
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

      const refetch = () => fetchData();

      return { data, loading, refetch };
 
};
