import React, { useEffect, useState } from "react";

export default function AirtelMoney() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
      };

      const inputBody = JSON.stringify({
        client_id: "**************",
        client_secret: "*****************",
        grant_type: "client_credentials",
      });

      try {
        const response = await fetch(
          "https://openapiuat.airtel.africa/auth/oauth2/token",
          {
            method: "POST",
            body: inputBody,
            headers: headers,
          }
        );

        if (!response.ok) {
          // Handle non-successful response (e.g., 4xx or 5xx status codes)
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>AirtelMoney</h1>
      {data && (
        <div>
          <h2>Fetched Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
