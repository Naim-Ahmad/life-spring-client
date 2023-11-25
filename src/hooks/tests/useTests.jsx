import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "../../config/axios.config";

export default function useTests() {
  const [tests, setTests] = useState([]);

  const { data, isPending, refetch, status } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axios.get("/tests");
      return res.data;
    },
  });

  useEffect(() => {
    if (status === "success") {
      setTests(data);
    }
  }, [data, status]);

  return { tests, setTests, isPending, refetch };
}
