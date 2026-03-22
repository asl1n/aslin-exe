import { useState, useEffect } from "react";

export function useFetch(url: any) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// Use the useFetch hook in a component
/*
import { useFetch } from './useFetch';

function UserProfile() {
  const { data, loading } = useFetch('https://api.example.com/user');

  if (loading) return <p>Loading...</p>;
  return <div>{data.name}</div>;
}*/
