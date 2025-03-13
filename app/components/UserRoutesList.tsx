"use client";
import { useEffect, useState } from 'react';

export default function UserRoutesList({ userId }: { userId: string }) {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch(`/api/myRoutes/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setRoutes(data))
      .catch(() => setRoutes([]));
  }, [userId]);

  return (
    <div>
      <h2>User Routes</h2>
      <ul>
        {routes.map((route) => (
          <li key={route._id}>{route.name}</li>
        ))}
      </ul>
    </div>
  );
}